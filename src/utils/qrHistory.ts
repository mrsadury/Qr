import { QRHistory } from '../types/qr';

const STORAGE_KEY = 'qrforge-history';

export const saveQRToHistory = (qr: QRHistory): void => {
  const history = getQRHistory();
  const newHistory = [qr, ...history.filter(item => item.id !== qr.id)].slice(0, 50);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
};

export const getQRHistory = (): QRHistory[] => {
  try {
    const history = localStorage.getItem(STORAGE_KEY);
    return history ? JSON.parse(history) : [];
  } catch {
    return [];
  }
};

export const deleteQRFromHistory = (id: string): void => {
  const history = getQRHistory();
  const filtered = history.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const clearQRHistory = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};