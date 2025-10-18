# Chat File Upload Functionality Fixes

## Issues Identified

Based on the provided code, here are the main issues preventing PDF and other file format uploads:

### 1. Missing Upload Middleware Configuration
The `createUploader` middleware needs proper configuration for file types and size limits.

### 2. Backend Controller Issues
The `uploadMessageFile` controller needs proper error handling and file validation.

### 3. Frontend File Validation
The frontend needs comprehensive file type validation and better error handling.

## Backend Fixes Required

### 1. Update Upload Middleware (`middleware/upload.js`)

```javascript
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const createUploader = (folderName) => {
  // Ensure upload directory exists
  const uploadDir = path.join(__dirname, '../uploads', folderName);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      // Generate unique filename with timestamp
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
  });

  const fileFilter = (req, file, cb) => {
    // Allow all common file types including PDFs
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg', 
      'image/png',
      'image/gif',
      'image/webp',
      'video/mp4',
      'video/avi',
      'video/mov',
      'video/wmv',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain',
      'text/csv'
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type ${file.mimetype} is not supported`), false);
    }
  };

  return multer({
    storage: storage,
    limits: {
      fileSize: 50 * 1024 * 1024, // 50MB limit
    },
    fileFilter: fileFilter
  });
};

module.exports = createUploader;
```

### 2. Update Chat Controller (`controllers/Chat/chatController.js`)

```javascript
const { ChatRoom, Message } = require("../../models/Chat/ChatModel");
const path = require('path');

const uploadMessageFile = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { role, refId } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    if (!orderId || !role || !refId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: orderId, role, or refId"
      });
    }

    // Find the chat room
    const room = await ChatRoom.findOne({ orderId });
    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Chat room not found"
      });
    }

    // Generate file URL (adjust based on your server setup)
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/chat_media/${req.file.filename}`;
    
    // Create message with file
    const message = await Message.create({
      room: room._id,
      sender: { role, refId },
      text: "",
      fileUrl: fileUrl,
      fileType: req.file.mimetype,
      originalName: req.file.originalname,
    });

    res.status(200).json({
      success: true,
      message: {
        _id: message._id,
        fileUrl: message.fileUrl,
        fileType: message.fileType,
        originalName: message.originalName,
        sentAt: message.sentAt
      }
    });

  } catch (error) {
    console.error("File upload error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "File upload failed"
    });
  }
};

const getChatHistory = async (req, res) => {
  try {
    const { orderId } = req.params;

    const room = await ChatRoom.findOne({ orderId });
    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Chat room not found"
      });
    }

    const messages = await Message.find({ room: room._id })
      .sort({ sentAt: 1 })
      .populate('sender.refId', 'name')
      .lean();

    res.status(200).json({
      success: true,
      messages: messages
    });

  } catch (error) {
    console.error("Get chat history error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch chat history"
    });
  }
};

module.exports = {
  uploadMessageFile,
  getChatHistory
};
```

### 3. Add Static File Serving

In your main server file (usually `app.js` or `server.js`), add:

```javascript
const express = require('express');
const path = require('path');

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
```

### 4. Update Socket.io Handler

```javascript
const socket = require("socket.io");
const { ChatRoom, Message } = require("../models/Chat/ChatModel");

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", async ({ name, userId, targetId, orderId, role }) => {
      const roomId = orderId;

      if (!userId || !targetId || !role || !orderId) {
        console.error("Missing required fields for chat room creation");
        socket.emit("error", { message: "Missing required fields" });
        return;
      }

      try {
        let room = await ChatRoom.findOne({ orderId });

        if (!room) {
          room = await ChatRoom.create({
            orderId,
            participants: [
              { role, refId: userId },
              {
                role: role === "customer" ? "inspector" : "customer",
                refId: targetId,
              },
            ],
            createdBy: { role, refId: userId },
          });
        }

        socket.join(roomId);
        socket.emit("joinedChat", { roomId, success: true });
      } catch (error) {
        console.error("Join chat error:", error);
        socket.emit("error", { message: "Failed to join chat" });
      }
    });

    socket.on("sendMessage", async ({ name, userId, targetId, orderId, role, text, fileUrl, fileType, originalName }) => {
      try {
        const roomId = orderId;
        const room = await ChatRoom.findOne({ orderId });
        
        if (!room) {
          socket.emit("error", { message: "Chat room not found" });
          return;
        }

        const message = await Message.create({
          room: room._id,
          sender: { role, refId: userId },
          text: text || "",
          fileUrl: fileUrl || null,
          fileType: fileType || null,
          originalName: originalName || null,
        });

        // Emit to all users in the room
        io.to(roomId).emit("messageReceived", {
          text: message.text,
          senderId: userId,
          role,
          sentAt: message.sentAt,
          fileUrl: message.fileUrl,
          fileType: message.fileType,
          originalName: message.originalName,
        });

      } catch (error) {
        console.error("Send message error:", error);
        socket.emit("error", { message: "Failed to send message" });
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

module.exports = initializeSocket;
```

### 5. Update Chat Model (if needed)

Ensure your `ChatModel.js` has proper schema definitions:

```javascript
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatRoom',
    required: true
  },
  sender: {
    role: {
      type: String,
      required: true,
      enum: ['customer', 'inspector', 'company']
    },
    refId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  },
  text: {
    type: String,
    default: ""
  },
  fileUrl: {
    type: String,
    default: null
  },
  fileType: {
    type: String,
    default: null
  },
  originalName: {
    type: String,
    default: null
  },
  sentAt: {
    type: Date,
    default: Date.now
  }
});

const chatRoomSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  participants: [{
    role: {
      type: String,
      required: true,
      enum: ['customer', 'inspector', 'company']
    },
    refId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  }],
  createdBy: {
    role: {
      type: String,
      required: true
    },
    refId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Message = mongoose.model('Message', messageSchema);
const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);

module.exports = { Message, ChatRoom };
```

## Common Issues and Solutions

### Issue 1: "Multer: Unexpected field" Error
**Solution**: Ensure the form field name matches the multer configuration (`upload.single("file")`).

### Issue 2: File Type Rejection
**Solution**: Check that the MIME type is included in the `allowedTypes` array in the fileFilter.

### Issue 3: File Size Limit Exceeded
**Solution**: Adjust the `fileSize` limit in multer configuration and ensure frontend validates file size.

### Issue 4: File Path Issues
**Solution**: Use `path.join()` for cross-platform compatibility and ensure upload directories exist.

### Issue 5: CORS Issues with File Uploads
**Solution**: Ensure CORS is properly configured for file upload endpoints.

## Testing the Fix

1. Test with different file types (PDF, images, documents)
2. Test file size limits
3. Test error handling for unsupported files
4. Test concurrent uploads
5. Verify file URLs are accessible
6. Test chat history with file messages

## Security Considerations

1. **File Type Validation**: Always validate file types on both frontend and backend
2. **File Size Limits**: Implement reasonable file size limits
3. **File Storage**: Consider using cloud storage (AWS S3, Cloudinary) for production
4. **File Scanning**: Consider implementing virus scanning for uploaded files
5. **Access Control**: Ensure only authorized users can access uploaded files