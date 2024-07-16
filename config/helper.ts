export function formatDate(date: Date): string {
    // Example format: "2024-12-31"
    return date.toISOString().split('T')[0];
  }