import { Language } from '../types';

export function isSpeechRecognitionSupported(): boolean {
  return typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
}

export function startSpeechRecognition(
  language: Language,
  onResult: (text: string) => void,
  onError: (error: string) => void,
  onEnd: () => void
): any {
  if (!isSpeechRecognitionSupported()) {
    onError('Speech recognition is not supported in this browser.');
    return null;
  }

  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';

  recognition.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };

  recognition.onerror = (event: any) => {
    onError(event.error || 'Speech recognition error');
  };

  recognition.onend = () => {
    onEnd();
  };

  try {
    recognition.start();
    return recognition;
  } catch (e: any) {
    onError(e.message || 'Could not start speech recognition');
    return null;
  }
}

export function speakText(text: string, language: Language, onEnd?: () => void): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  // Cancel existing utterances
  window.speechSynthesis.cancel();

  // Strip markdown or extra symbols for clean voice synthesis
  const clean = text
    .replace(/[#*_`[\]()]/g, '')
    .replace(/https?:\/\/\S+/g, '')
    .trim();

  const utterance = new SpeechSynthesisUtterance(clean);
  utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
  utterance.rate = 0.95;
  utterance.pitch = 1.0;

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
