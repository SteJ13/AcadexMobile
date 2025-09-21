// Main notifications module - exports all notification functionality
export { requestUserPermission, getFCMToken } from './permissions';
export { setupNotificationHandlers } from './handlers';

// Re-export for backward compatibility
export { requestUserPermission as default } from './permissions';
