import { Injectable } from '@angular/core';
import { CameraServiceService } from './camera-service.service';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private cameraService: CameraServiceService) {}

  parseImageUpload($event: any) {
    this.blobToBase64($event.target.files[0]).then(
      (result: string | ArrayBuffer | null) => {
        if (typeof result === 'string') {
          this.setUploadedImage(result);
        }
      }
    );
  }

  setUploadedImage(b64Data: string) {
    console.log(b64Data);
    this.cameraService.base64Image = b64Data;
    this.cameraService.setFlash();
    this.cameraService.toggleCameraWindow();
    setTimeout(() => {
      this.cameraService.minimizeSnapshot();
    }, 1500);
  }

  private blobToBase64(blob: Blob) {
    return new Promise<string | ArrayBuffer | null>((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }
}
