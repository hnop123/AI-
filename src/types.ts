export type Language = "zh-TW" | "en" | "ja";

export type MediaType = "video" | "image";

export interface MediaAsset {
  id: string;
  name: string;
  type: MediaType;
  size: string;
  originalResolution: string;
  currentResolution: string;
  duration?: number; // in seconds, undefined for images
  originalFps?: number; // e.g. 24, 29.97, 30, 60
  format: string; // e.g., MP4, RAW, JPEG, WEBP, PNG, WebM
  dataUrl: string; // Base64 or object URL or placeholder
  uploadedTime: string;
  isDemo?: boolean;
  rawExif?: {
    cameraModel?: string;
    lens?: string;
    iso?: number;
    aperture?: string;
    shutterSpeed?: string;
    focalLength?: string;
    exposureProgram?: string;
  };
}

export interface EnhancementParams {
  brightness: number; // 0-100 (50 is neutral)
  contrast: number; // 0-100 (50 is neutral)
  saturation: number; // 0-100 (50 is neutral)
  sharpness: number; // 0-100 (50 is neutral or 0 is no sharpening)
  denoise: number; // 0-100 (0 is off)
  highlights: number; // 0-100 (50 is neutral)
  shadows: number; // 0-100 (50 is neutral)
  temperature: number; // 0-100 (50 is neutral, warmer vs cooler)
  tint: number; // 0-100 (50 is neutral)
  
  // Upscaling target
  targetScale: "480p" | "720p" | "1080p" | "4K";
  targetFps: 24 | 30 | 60;
}

export interface AudioParams {
  volume: number; // 0 - 200 (100 is original)
  bass: number; // 0 - 100 (50 is original)
  treble: number; // 0 - 100 (50 is original)
  noiseReduction: boolean;
  stereoEnhance: boolean;
  voiceHighlight: boolean;
  codec: "AAC" | "MP3" | "OPUS" | "PCM";
  bitrateKbps: number; // 96, 128, 192, 320
}

export interface WatermarkParams {
  enabled: boolean;
  text: string;
  position: "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "center";
  opacity: number; // 0-100
  fontSize: number; // 12-72
  color: string; // "#ffffff", "#000000", etc.
}

export interface ExportParams {
  format: "MP4" | "MKV" | "AVI" | "MOV" | "WebM" | "PNG" | "JPEG" | "WEBP" | "RAW";
  codec: "H.264" | "H.265/HEVC" | "AV1" | "VP9" | "ProRes" | "PNG" | "JPEG" | "WEBP";
  bitrateMbps: number; // 1-50
  presetSpeed: "ultrafast" | "superfast" | "veryfast" | "faster" | "fast" | "medium" | "slow" | "slower";
}

export interface CutParams {
  enabled: boolean;
  startSec: number;
  endSec: number;
}

export interface PresetTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: MediaType;
  enhancement: EnhancementParams;
  export: ExportParams;
  audio?: AudioParams;
}

export interface GpuTelemetry {
  id: string;
  name: string;
  active: boolean;
  utilization: number; // 0-100 %
  temperature: number; // °C
  vramUsed: number; // GB
  vramTotal: number; // GB
  cudaCores: number;
}

export interface BatchTask {
  id: string;
  assetId: string;
  assetName: string;
  type: MediaType;
  status: "pending" | "processing" | "completed" | "failed";
  progress: number; // 0-100
  fps: number; // current simulated speed
  eta: number; // remaining seconds
  outputUrl?: string; // final result
  message?: string;
  params: {
    enhancement: EnhancementParams;
    export: ExportParams;
    watermark: WatermarkParams;
    audio?: AudioParams;
    cut?: CutParams;
  };
}

export interface CloudAsset {
  id: string;
  name: string;
  type: MediaType;
  size: string;
  resolution: string;
  url: string;
  backupTime: string;
  downloadCount: number;
}
