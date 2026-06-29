const swaggerJsdoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'RABTA - Incident Management System API',
    version: '1.0.0',
    description: 'RABTA (ربطہ) is a modern, cross-platform incident management system. This API provides complete incident lifecycle management, user administration, team collaboration, notifications, and audit tracking.',
    contact: {
      name: 'RABTA Support',
      email: 'support@rabta.app',
    },
  },
  servers: [
    {
      url: 'http://localhost:5001',
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT token: Authorization: Bearer <token>',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '664f1a2b3c4d5e6f7a8b9c0d' },
          email: { type: 'string', format: 'email', example: 'user@example.com' },
          name: { type: 'string', example: 'Ahmed Khan' },
          phone: { type: 'string', example: '+92 300 1234567' },
          role: { type: 'string', enum: ['user', 'admin', 'manager'], example: 'user' },
          verified: { type: 'boolean', example: true },
          isActive: { type: 'boolean', example: true },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      Incident: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          title: { type: 'string', example: 'Network outage in building A' },
          description: { type: 'string', example: 'All network switches on floor 3 are unresponsive' },
          status: { type: 'string', enum: ['open', 'in_progress', 'resolved', 'closed'], example: 'open' },
          priority: { type: 'string', enum: ['low', 'medium', 'high', 'critical'], example: 'high' },
          category: { type: 'string', example: '664f1a2b3c4d5e6f7a8b9c0d' },
          reportedBy: { type: 'string', example: '664f1a2b3c4d5e6f7a8b9c0d' },
          assignedTo: { type: 'string', example: '664f1a2b3c4d5e6f7a8b9c0d' },
          team: { type: 'string', example: '664f1a2b3c4d5e6f7a8b9c0d' },
          location: { type: 'string', example: 'Building A, Floor 3' },
          affectedService: { type: 'string', example: 'Network Infrastructure' },
          resolution: { type: 'string', example: 'Replaced faulty switch' },
          tags: { type: 'array', items: { type: 'string' }, example: ['network', 'urgent'] },
          dueDate: { type: 'string', format: 'date-time' },
          resolvedAt: { type: 'string', format: 'date-time' },
          closedAt: { type: 'string', format: 'date-time' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      Category: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string', example: 'Network' },
          description: { type: 'string', example: 'Network-related incidents' },
          color: { type: 'string', example: '#D1453B' },
          icon: { type: 'string', example: 'wifi' },
          isActive: { type: 'boolean', example: true },
        },
      },
      Team: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string', example: 'Infrastructure Team' },
          description: { type: 'string', example: 'Handles hardware and network issues' },
          lead: { type: 'string', example: '664f1a2b3c4d5e6f7a8b9c0d' },
          members: { type: 'array', items: { type: 'string' } },
          isActive: { type: 'boolean', example: true },
        },
      },
      Comment: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          incident: { type: 'string' },
          author: { type: 'string' },
          body: { type: 'string', example: 'Investigating the root cause' },
          isInternal: { type: 'boolean', example: false },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      Attachment: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          incident: { type: 'string' },
          uploadedBy: { type: 'string' },
          fileName: { type: 'string', example: 'screenshot.png' },
          fileUrl: { type: 'string', example: 'https://cloudinary.com/file.png' },
          fileType: { type: 'string', example: 'image/png' },
          fileSize: { type: 'number', example: 204800 },
        },
      },
      Notification: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          recipient: { type: 'string' },
          type: { type: 'string', enum: ['incident_assigned', 'incident_updated', 'status_change', 'comment_added', 'system'] },
          title: { type: 'string', example: 'Incident assigned to you' },
          message: { type: 'string', example: 'Incident "Network outage" has been assigned to you' },
          incident: { type: 'string' },
          isRead: { type: 'boolean', example: false },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      AuditLog: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          action: { type: 'string', example: 'status_change' },
          actor: { type: 'string' },
          resource: { type: 'string', example: 'Incident' },
          resourceId: { type: 'string' },
          details: { type: 'object', example: { status: 'resolved' } },
          ip: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      DashboardStats: {
        type: 'object',
        properties: {
          totalIncidents: { type: 'integer', example: 150 },
          openIncidents: { type: 'integer', example: 30 },
          inProgressIncidents: { type: 'integer', example: 25 },
          resolvedIncidents: { type: 'integer', example: 70 },
          closedIncidents: { type: 'integer', example: 25 },
          criticalIncidents: { type: 'integer', example: 5 },
          totalUsers: { type: 'integer', example: 45 },
          unassignedIncidents: { type: 'integer', example: 10 },
          incidentsByDay: { type: 'array', items: { type: 'object', properties: { _id: { type: 'string' }, count: { type: 'integer' } } } },
        },
      },
      Error: {
        type: 'object',
        properties: {
          error: { type: 'string', example: 'Validation failed' },
          details: { type: 'array', items: { type: 'string' } },
        },
      },
    },
  },
  tags: [
    { name: 'Auth', description: 'Authentication, registration, email verification, password management' },
    { name: 'Users', description: 'User management (admin/manager access required for most)' },
    { name: 'Incidents', description: 'Complete incident lifecycle — create, read, update, delete, assign, comment, attach files' },
    { name: 'Categories', description: 'Incident categorization' },
    { name: 'Teams', description: 'Team management and member assignment' },
    { name: 'Comments', description: 'Comment operations (update/delete own comments)' },
    { name: 'Attachments', description: 'Attachment operations (delete own attachments)' },
    { name: 'Notifications', description: 'User notification center' },
    { name: 'Dashboard', description: 'Dashboard statistics and recent activity' },
    { name: 'Audit Logs', description: 'System audit trail (admin only)' },
    { name: 'Settings', description: 'System-wide settings (admin only)' },
    { name: 'Health', description: 'Server health check' },
  ],
  paths: {
    // ==================== HEALTH ====================
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'Health check endpoint',
        description: 'Returns server status and current timestamp',
        responses: {
          200: {
            description: 'Server is healthy',
            content: { 'application/json': { schema: { type: 'object', properties: { status: { type: 'string', example: 'ok' }, timestamp: { type: 'string', format: 'date-time' } } } } },
          },
        },
      },
    },

    // ==================== API ROOT ====================
    '/api': {
      get: {
        tags: ['Health'],
        summary: 'API root',
        description: 'Returns API information and available endpoints',
        responses: {
          200: {
            description: 'API information',
            content: { 'application/json': { schema: { type: 'object' } } },
          },
        },
      },
    },

    // ==================== AUTH ====================
    '/api/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Register a new user',
        description: 'Creates a user account and sends a 6-digit verification code via email',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', format: 'email', example: 'user@example.com' },
                  password: { type: 'string', format: 'password', example: 'securePass123', minLength: 6 },
                  name: { type: 'string', example: 'Ahmed Khan' },
                  phone: { type: 'string', example: '+92 300 1234567' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Account created, verification code sent' },
          400: { description: 'Validation failed', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          409: { description: 'Email already exists' },
        },
      },
    },
    '/api/auth/verify-email': {
      post: {
        tags: ['Auth'],
        summary: 'Verify email address',
        description: 'Verifies the user email using the 6-digit code sent during registration',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'code'],
                properties: {
                  email: { type: 'string', format: 'email', example: 'user@example.com' },
                  code: { type: 'string', example: '482917', minLength: 6, maxLength: 6 },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Email verified, JWT token returned' },
          400: { description: 'Invalid or expired code' },
          404: { description: 'User not found' },
        },
      },
    },
    '/api/auth/resend-code': {
      post: {
        tags: ['Auth'],
        summary: 'Resend verification code',
        description: 'Generates and sends a new 6-digit verification code to the user email',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email'],
                properties: { email: { type: 'string', format: 'email', example: 'user@example.com' } },
              },
            },
          },
        },
        responses: {
          200: { description: 'Verification code resent' },
          400: { description: 'Email already verified' },
          404: { description: 'User not found' },
        },
      },
    },
    '/api/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'User login',
        description: 'Authenticates user credentials and returns a JWT token. Returns 403 if email not verified.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', format: 'email', example: 'user@example.com' },
                  password: { type: 'string', format: 'password', example: 'securePass123' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Login successful, JWT token returned' },
          401: { description: 'Invalid email or password' },
          403: { description: 'Email not verified or account deactivated' },
        },
      },
    },
    '/api/auth/forgot-password': {
      post: {
        tags: ['Auth'],
        summary: 'Request password reset',
        description: 'Sends a password reset link to the user email if account exists',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email'],
                properties: { email: { type: 'string', format: 'email', example: 'user@example.com' } },
              },
            },
          },
        },
        responses: {
          200: { description: 'Reset link sent if email exists' },
        },
      },
    },
    '/api/auth/reset-password': {
      post: {
        tags: ['Auth'],
        summary: 'Reset password with token',
        description: 'Resets the user password using a valid reset token received via email',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['token', 'password'],
                properties: {
                  token: { type: 'string', example: 'abc123def456...' },
                  password: { type: 'string', format: 'password', example: 'newSecurePass123', minLength: 6 },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Password reset successfully' },
          400: { description: 'Invalid or expired token' },
        },
      },
    },
    '/api/auth/change-password': {
      post: {
        tags: ['Auth'],
        summary: 'Change password',
        description: 'Changes the authenticated user password. Requires current password verification.',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['currentPassword', 'newPassword'],
                properties: {
                  currentPassword: { type: 'string', format: 'password', example: 'oldPass123' },
                  newPassword: { type: 'string', format: 'password', example: 'newPass456', minLength: 6 },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Password changed successfully' },
          400: { description: 'Current password is incorrect or validation failed' },
        },
      },
    },
    '/api/auth/profile': {
      get: {
        tags: ['Auth'],
        summary: 'Get profile',
        description: 'Returns the authenticated user profile information',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'User profile', content: { 'application/json': { schema: { type: 'object', properties: { success: { type: 'boolean' }, user: { $ref: '#/components/schemas/User' } } } } } },
          401: { description: 'Unauthorized' },
        },
      },
      put: {
        tags: ['Auth'],
        summary: 'Update profile',
        description: 'Updates the authenticated user name and/or phone number',
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string', example: 'Ahmed Khan Updated' },
                  phone: { type: 'string', example: '+92 300 9876543' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Profile updated' },
          400: { description: 'No valid fields to update' },
        },
      },
    },
    '/api/auth/verify-token': {
      get: {
        tags: ['Auth'],
        summary: 'Verify token validity',
        description: 'Checks whether the current JWT token is valid and returns user info',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Token is valid', content: { 'application/json': { schema: { type: 'object', properties: { valid: { type: 'boolean', example: true }, user: { $ref: '#/components/schemas/User' } } } } } },
          401: { description: 'Invalid or expired token' },
        },
      },
    },

    // ==================== USERS ====================
    '/api/users': {
      get: {
        tags: ['Users'],
        summary: 'List users',
        description: 'Retrieves a paginated list of users. Requires admin or manager role.',
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 20 } },
          { name: 'role', in: 'query', schema: { type: 'string', enum: ['user', 'admin', 'manager'] } },
          { name: 'isActive', in: 'query', schema: { type: 'boolean' } },
          { name: 'search', in: 'query', schema: { type: 'string' }, description: 'Search by name or email' },
        ],
        responses: {
          200: { description: 'Paginated list of users' },
          403: { description: 'Insufficient permissions' },
        },
      },
    },
    '/api/users/export': {
      get: {
        tags: ['Users'],
        summary: 'Export users',
        description: 'Exports all active users data. Admin only.',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Users data exported' },
        },
      },
    },
    '/api/users/{id}': {
      get: {
        tags: ['Users'],
        summary: 'Get user by ID',
        description: 'Retrieves a single user by their ID',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'User found', content: { 'application/json': { schema: { type: 'object', properties: { success: { type: 'boolean' }, data: { $ref: '#/components/schemas/User' } } } } } },
          404: { description: 'User not found' },
        },
      },
      put: {
        tags: ['Users'],
        summary: 'Update user',
        description: 'Updates user details. Admin only.',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  phone: { type: 'string' },
                  isActive: { type: 'boolean' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'User updated' },
          404: { description: 'User not found' },
        },
      },
      delete: {
        tags: ['Users'],
        summary: 'Delete user (deactivate)',
        description: 'Deactivates a user account. Admin only.',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'User deactivated' },
          404: { description: 'User not found' },
        },
      },
    },
    '/api/users/{id}/role': {
      put: {
        tags: ['Users'],
        summary: 'Update user role',
        description: 'Changes a user role. Admin only.',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { type: 'object', required: ['role'], properties: { role: { type: 'string', enum: ['user', 'admin', 'manager'] } } } } },
        },
        responses: {
          200: { description: 'Role updated' },
          400: { description: 'Invalid role' },
        },
      },
    },
    '/api/users/{id}/incidents': {
      get: {
        tags: ['Users'],
        summary: 'Get user incidents',
        description: 'Retrieves all incidents reported by a specific user',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'List of user incidents' },
        },
      },
    },

    // ==================== INCIDENTS ====================
    '/api/incidents/stats': {
      get: {
        tags: ['Incidents'],
        summary: 'Get incident statistics',
        description: 'Returns aggregate statistics about all incidents (counts by status, priority, category)',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Incident statistics' },
        },
      },
    },
    '/api/incidents/my': {
      get: {
        tags: ['Incidents'],
        summary: 'Get my incidents',
        description: 'Returns incidents reported by the authenticated user',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'List of user incidents' },
        },
      },
    },
    '/api/incidents/search': {
      get: {
        tags: ['Incidents'],
        summary: 'Search incidents',
        description: 'Full-text search across incident titles, descriptions, locations, services, and tags',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'q', in: 'query', required: true, schema: { type: 'string' }, description: 'Search query' }],
        responses: {
          200: { description: 'Search results' },
          400: { description: 'Search query required' },
        },
      },
    },
    '/api/incidents/export': {
      get: {
        tags: ['Incidents'],
        summary: 'Export incidents',
        description: 'Exports all incidents data with populated references. Admin/manager only.',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Incidents data exported' },
        },
      },
    },
    '/api/incidents/bulk': {
      post: {
        tags: ['Incidents'],
        summary: 'Bulk create incidents',
        description: 'Creates multiple incidents at once. Admin only.',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Incident' } } } },
        },
        responses: {
          201: { description: 'Incidents created' },
          400: { description: 'Array of incidents required' },
        },
      },
    },
    '/api/incidents/bulk-status': {
      patch: {
        tags: ['Incidents'],
        summary: 'Bulk update status',
        description: 'Updates the status of multiple incidents at once. Admin/manager only.',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['ids', 'status'],
                properties: {
                  ids: { type: 'array', items: { type: 'string' } },
                  status: { type: 'string', enum: ['open', 'in_progress', 'resolved', 'closed'] },
                  resolution: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Statuses updated' },
        },
      },
    },
    '/api/incidents': {
      post: {
        tags: ['Incidents'],
        summary: 'Create incident',
        description: 'Creates a new incident. The reportedBy field is set to the authenticated user.',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['title', 'description'],
                properties: {
                  title: { type: 'string', example: 'Network outage in building A' },
                  description: { type: 'string', example: 'All network switches on floor 3 are unresponsive' },
                  priority: { type: 'string', enum: ['low', 'medium', 'high', 'critical'], example: 'high' },
                  category: { type: 'string', example: '664f1a2b3c4d5e6f7a8b9c0d' },
                  location: { type: 'string', example: 'Building A, Floor 3' },
                  affectedService: { type: 'string', example: 'Network Infrastructure' },
                  dueDate: { type: 'string', format: 'date-time' },
                  tags: { type: 'array', items: { type: 'string' }, example: ['network'] },
                  team: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Incident created', content: { 'application/json': { schema: { $ref: '#/components/schemas/Incident' } } } },
          400: { description: 'Validation failed' },
        },
      },
      get: {
        tags: ['Incidents'],
        summary: 'List incidents',
        description: 'Retrieves a paginated list of incidents with filtering and sorting',
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 20 } },
          { name: 'status', in: 'query', schema: { type: 'string', enum: ['open', 'in_progress', 'resolved', 'closed'] } },
          { name: 'priority', in: 'query', schema: { type: 'string', enum: ['low', 'medium', 'high', 'critical'] } },
          { name: 'category', in: 'query', schema: { type: 'string' } },
          { name: 'assignedTo', in: 'query', schema: { type: 'string' } },
          { name: 'reportedBy', in: 'query', schema: { type: 'string' } },
          { name: 'search', in: 'query', schema: { type: 'string' }, description: 'Search in title and description' },
          { name: 'sortBy', in: 'query', schema: { type: 'string', default: 'createdAt' } },
          { name: 'sortOrder', in: 'query', schema: { type: 'string', enum: ['asc', 'desc'], default: 'desc' } },
        ],
        responses: {
          200: { description: 'Paginated list of incidents' },
        },
      },
    },
    '/api/incidents/{id}': {
      get: {
        tags: ['Incidents'],
        summary: 'Get incident by ID',
        description: 'Retrieves a single incident with populated references',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Incident details' },
          404: { description: 'Incident not found' },
        },
      },
      put: {
        tags: ['Incidents'],
        summary: 'Update incident',
        description: 'Updates incident fields (title, description, priority, category, location, etc.)',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  description: { type: 'string' },
                  priority: { type: 'string', enum: ['low', 'medium', 'high', 'critical'] },
                  category: { type: 'string' },
                  location: { type: 'string' },
                  affectedService: { type: 'string' },
                  dueDate: { type: 'string', format: 'date-time' },
                  tags: { type: 'array', items: { type: 'string' } },
                  team: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Incident updated' },
          404: { description: 'Incident not found' },
        },
      },
      delete: {
        tags: ['Incidents'],
        summary: 'Delete incident',
        description: 'Permanently deletes an incident and its associated comments and attachments. Admin/manager only.',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Incident deleted' },
          404: { description: 'Incident not found' },
        },
      },
    },
    '/api/incidents/{id}/status': {
      patch: {
        tags: ['Incidents'],
        summary: 'Update incident status',
        description: 'Updates the status of an incident. Sends notification to the reporter on change.',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['status'],
                properties: {
                  status: { type: 'string', enum: ['open', 'in_progress', 'resolved', 'closed'] },
                  resolution: { type: 'string', description: 'Resolution notes (required when closing)' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Status updated' },
          404: { description: 'Incident not found' },
        },
      },
    },
    '/api/incidents/{id}/priority': {
      patch: {
        tags: ['Incidents'],
        summary: 'Update incident priority',
        description: 'Updates the priority level of an incident',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['priority'],
                properties: { priority: { type: 'string', enum: ['low', 'medium', 'high', 'critical'] } },
              },
            },
          },
        },
        responses: {
          200: { description: 'Priority updated' },
          404: { description: 'Incident not found' },
        },
      },
    },
    '/api/incidents/{id}/assign': {
      post: {
        tags: ['Incidents'],
        summary: 'Assign incident',
        description: 'Assigns an incident to a user. Sends notification to the assignee. Admin/manager only.',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['assignedTo'],
                properties: { assignedTo: { type: 'string', example: '664f1a2b3c4d5e6f7a8b9c0d' } },
              },
            },
          },
        },
        responses: {
          200: { description: 'Incident assigned' },
          404: { description: 'Incident not found' },
        },
      },
    },
    '/api/incidents/{id}/comments': {
      post: {
        tags: ['Incidents'],
        summary: 'Add comment to incident',
        description: 'Adds a comment to an incident. Sends notification to the assignee if different from commenter.',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['body'],
                properties: {
                  body: { type: 'string', example: 'Investigating the root cause now' },
                  isInternal: { type: 'boolean', default: false, description: 'Internal notes (not visible to reporter)' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Comment added' },
        },
      },
      get: {
        tags: ['Incidents'],
        summary: 'Get incident comments',
        description: 'Retrieves all comments for a specific incident',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'List of comments' },
        },
      },
    },
    '/api/incidents/{id}/attachments': {
      post: {
        tags: ['Incidents'],
        summary: 'Add attachment to incident',
        description: 'Adds a file attachment reference to an incident',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['fileName', 'fileUrl'],
                properties: {
                  fileName: { type: 'string', example: 'screenshot.png' },
                  fileUrl: { type: 'string', example: 'https://cloudinary.com/file.png' },
                  fileType: { type: 'string', example: 'image/png' },
                  fileSize: { type: 'number', example: 204800 },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Attachment added' },
        },
      },
      get: {
        tags: ['Incidents'],
        summary: 'Get incident attachments',
        description: 'Retrieves all file attachments for a specific incident',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'List of attachments' },
        },
      },
    },

    // ==================== CATEGORIES ====================
    '/api/categories': {
      post: {
        tags: ['Categories'],
        summary: 'Create category',
        description: 'Creates a new incident category. Admin only.',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name'],
                properties: {
                  name: { type: 'string', example: 'Network' },
                  description: { type: 'string', example: 'Network-related incidents' },
                  color: { type: 'string', example: '#D1453B' },
                  icon: { type: 'string', example: 'wifi' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Category created' },
          409: { description: 'Category already exists' },
        },
      },
      get: {
        tags: ['Categories'],
        summary: 'List categories',
        description: 'Retrieves all incident categories sorted by name',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'List of categories' },
        },
      },
    },
    '/api/categories/{id}': {
      get: {
        tags: ['Categories'],
        summary: 'Get category by ID',
        description: 'Retrieves a single category',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Category details' },
          404: { description: 'Category not found' },
        },
      },
      put: {
        tags: ['Categories'],
        summary: 'Update category',
        description: 'Updates a category. Admin only.',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  description: { type: 'string' },
                  color: { type: 'string' },
                  icon: { type: 'string' },
                  isActive: { type: 'boolean' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Category updated' },
          404: { description: 'Category not found' },
        },
      },
      delete: {
        tags: ['Categories'],
        summary: 'Delete category',
        description: 'Permanently deletes a category. Admin only.',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Category deleted' },
          404: { description: 'Category not found' },
        },
      },
    },

    // ==================== TEAMS ====================
    '/api/teams': {
      post: {
        tags: ['Teams'],
        summary: 'Create team',
        description: 'Creates a new team. Admin only.',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name'],
                properties: {
                  name: { type: 'string', example: 'Infrastructure Team' },
                  description: { type: 'string', example: 'Handles hardware and network issues' },
                  lead: { type: 'string', example: '664f1a2b3c4d5e6f7a8b9c0d' },
                  members: { type: 'array', items: { type: 'string' } },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Team created' },
          409: { description: 'Team already exists' },
        },
      },
      get: {
        tags: ['Teams'],
        summary: 'List teams',
        description: 'Retrieves all teams with populated lead and members',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'List of teams' },
        },
      },
    },
    '/api/teams/{id}': {
      get: {
        tags: ['Teams'],
        summary: 'Get team by ID',
        description: 'Retrieves a single team with populated lead and members',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Team details' },
          404: { description: 'Team not found' },
        },
      },
      put: {
        tags: ['Teams'],
        summary: 'Update team',
        description: 'Updates a team. Admin only.',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  description: { type: 'string' },
                  lead: { type: 'string' },
                  isActive: { type: 'boolean' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Team updated' },
          404: { description: 'Team not found' },
        },
      },
      delete: {
        tags: ['Teams'],
        summary: 'Delete team',
        description: 'Permanently deletes a team. Admin only.',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Team deleted' },
          404: { description: 'Team not found' },
        },
      },
    },
    '/api/teams/{id}/members': {
      post: {
        tags: ['Teams'],
        summary: 'Add team member',
        description: 'Adds a user to a team. Admin only.',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['userId'],
                properties: { userId: { type: 'string', example: '664f1a2b3c4d5e6f7a8b9c0d' } },
              },
            },
          },
        },
        responses: {
          200: { description: 'Member added' },
          400: { description: 'userId is required' },
        },
      },
    },
    '/api/teams/{id}/members/{userId}': {
      delete: {
        tags: ['Teams'],
        summary: 'Remove team member',
        description: 'Removes a user from a team. Admin only.',
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
          { name: 'userId', in: 'path', required: true, schema: { type: 'string' } },
        ],
        responses: {
          200: { description: 'Member removed' },
          404: { description: 'Team not found' },
        },
      },
    },

    // ==================== COMMENTS ====================
    '/api/comments/{id}': {
      put: {
        tags: ['Comments'],
        summary: 'Update comment',
        description: 'Updates a comment. Only the original author can update their comment.',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['body'],
                properties: { body: { type: 'string', example: 'Updated comment text' } },
              },
            },
          },
        },
        responses: {
          200: { description: 'Comment updated' },
          404: { description: 'Comment not found or unauthorized' },
        },
      },
      delete: {
        tags: ['Comments'],
        summary: 'Delete comment',
        description: 'Deletes a comment. Only the original author can delete their comment.',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Comment deleted' },
          404: { description: 'Comment not found or unauthorized' },
        },
      },
    },

    // ==================== ATTACHMENTS ====================
    '/api/attachments/{id}': {
      delete: {
        tags: ['Attachments'],
        summary: 'Delete attachment',
        description: 'Deletes an attachment. Only the uploader can delete their attachment.',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Attachment deleted' },
          404: { description: 'Attachment not found or unauthorized' },
        },
      },
    },

    // ==================== NOTIFICATIONS ====================
    '/api/notifications': {
      get: {
        tags: ['Notifications'],
        summary: 'List notifications',
        description: 'Retrieves the 50 most recent notifications for the authenticated user',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'List of notifications' },
        },
      },
    },
    '/api/notifications/unread-count': {
      get: {
        tags: ['Notifications'],
        summary: 'Get unread count',
        description: 'Returns the count of unread notifications for the authenticated user',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Unread count', content: { 'application/json': { schema: { type: 'object', properties: { success: { type: 'boolean' }, data: { type: 'object', properties: { unreadCount: { type: 'integer', example: 5 } } } } } } } },
        },
      },
    },
    '/api/notifications/read-all': {
      put: {
        tags: ['Notifications'],
        summary: 'Mark all as read',
        description: 'Marks all unread notifications as read for the authenticated user',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'All marked as read' },
        },
      },
    },
    '/api/notifications/{id}/read': {
      put: {
        tags: ['Notifications'],
        summary: 'Mark notification as read',
        description: 'Marks a single notification as read',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Notification marked as read' },
          404: { description: 'Notification not found' },
        },
      },
    },

    // ==================== DASHBOARD ====================
    '/api/dashboard/stats': {
      get: {
        tags: ['Dashboard'],
        summary: 'Get dashboard stats',
        description: 'Returns comprehensive dashboard statistics including counts by status, priority, daily trends, user count, and unassigned incidents',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Dashboard statistics', content: { 'application/json': { schema: { $ref: '#/components/schemas/DashboardStats' } } } },
        },
      },
    },
    '/api/dashboard/recent-incidents': {
      get: {
        tags: ['Dashboard'],
        summary: 'Get recent incidents',
        description: 'Returns the 10 most recent incidents with populated references',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Recent incidents' },
        },
      },
    },

    // ==================== AUDIT LOGS ====================
    '/api/audit-logs': {
      get: {
        tags: ['Audit Logs'],
        summary: 'List audit logs',
        description: 'Retrieves paginated audit trail records. Admin only.',
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 50 } },
          { name: 'action', in: 'query', schema: { type: 'string' }, description: 'Filter by action type' },
          { name: 'resource', in: 'query', schema: { type: 'string' }, description: 'Filter by resource type' },
        ],
        responses: {
          200: { description: 'Paginated audit logs' },
          403: { description: 'Insufficient permissions' },
        },
      },
    },

    // ==================== SETTINGS ====================
    '/api/settings': {
      get: {
        tags: ['Settings'],
        summary: 'Get system settings',
        description: 'Returns all system settings as key-value pairs. Admin only.',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'System settings' },
        },
      },
      put: {
        tags: ['Settings'],
        summary: 'Update system settings',
        description: 'Updates system settings. Creates new ones if they don\'t exist. Admin only.',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                example: { maintenanceMode: false, maxFileSize: 10485760, defaultPriority: 'medium' },
              },
            },
          },
        },
        responses: {
          200: { description: 'Settings updated' },
        },
      },
    },
  },
};

module.exports = swaggerDefinition;
