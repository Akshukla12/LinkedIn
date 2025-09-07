export const copyToClipboard = (text) => {
  if (!text) return;
  navigator.clipboard.writeText(text)
    .then(() => {
      // Create a temporary notification
      const notification = document.createElement('div');
      notification.textContent = 'Copied to clipboard!';
      notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg z-50 transition-all duration-300';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => document.body.removeChild(notification), 300);
      }, 2000);
    })
    .catch(() => {
      alert("Failed to copy text. Please try again.");
    });
};

export const downloadText = (text, filename = "output.txt") => {
  if (!text) return;
  const blob = new Blob([text], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  window.URL.revokeObjectURL(link.href);
};
