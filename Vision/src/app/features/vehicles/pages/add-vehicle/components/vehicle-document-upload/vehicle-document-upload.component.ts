import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  input,
  output
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehicle-document-upload',
  imports: [CommonModule],
  templateUrl: './vehicle-document-upload.component.html',
  styleUrls: ['./vehicle-document-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VehicleDocumentUploadComponent implements OnChanges, OnDestroy {
  readonly title = input.required<string>();
  readonly description = input<string>('');
  readonly accept = input<string>('');
  readonly required = input<boolean>(false);
  readonly invalid = input<boolean>(false);
  readonly file = input<File | null>(null);

  readonly fileChange = output<File | null>();

  isDragging = false;
  previewUrl: string | null = null;
  isImagePreview = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['file']) {
      const nextFile = changes['file'].currentValue as File | null;
      this.refreshPreview(nextFile);
    }
  }

  ngOnDestroy(): void {
    this.revokePreview();
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const droppedFile = event.dataTransfer?.files?.[0] ?? null;
    if (!droppedFile) {
      return;
    }

    this.fileChange.emit(droppedFile);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    const selectedFile = input?.files?.[0] ?? null;
    this.fileChange.emit(selectedFile);
  }

  removeFile(event?: Event): void {
    event?.stopPropagation();
    this.fileChange.emit(null);
  }

  formatSize(sizeInBytes: number): string {
    if (sizeInBytes < 1024) {
      return `${sizeInBytes} B`;
    }

    const sizeInKb = sizeInBytes / 1024;
    if (sizeInKb < 1024) {
      return `${sizeInKb.toFixed(1)} KB`;
    }

    return `${(sizeInKb / 1024).toFixed(1)} MB`;
  }

  private refreshPreview(file: File | null): void {
    this.revokePreview();

    if (!file) {
      this.isImagePreview = false;
      return;
    }

    this.isImagePreview = file.type.startsWith('image/');
    if (this.isImagePreview) {
      this.previewUrl = URL.createObjectURL(file);
    }
  }

  private revokePreview(): void {
    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl);
      this.previewUrl = null;
    }
  }
}
