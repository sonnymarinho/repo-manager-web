export const copyToClipboard = (value: string | string[]): boolean => {
  try {
    const textarea = document.createElement('textarea');
    const validValue = typeof value === 'string' ? value : value.join('\n');

    textarea.value = validValue;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    return true;
  } catch (error) {
    return false;
  }
};
