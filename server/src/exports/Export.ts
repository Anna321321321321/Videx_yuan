export default class Export {
  private courseId_: string;
  private lessonId_: string;
  private transcript_: { start: number; end: number; text: string }[];
  private preview_: string;
  protected name_: string;
  protected payload_: any;
  protected result_: any;

  constructor(
    courseId: string,
    lessonId: string,
    name: string,
    preview: string,
    transcripts: { start: number; end: number; text: string }[]
  ) {
    this.courseId_ = courseId;
    this.lessonId_ = lessonId;
    this.preview_ = preview;
    this.name_ = name;
    this.transcript_ = transcripts.reduce(
      (aggregator, transcript) => [
        ...aggregator,
        ...this.transcript2lut_(transcript)
      ],
      []
    );
  }

  protected imageLink_(start: number, end: number): string {
    const pad = (n, width) => {
      n = n + '';
      // prettier-ignore
      return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
    };
    if (start !== undefined || end !== undefined) {
      const idx = Math.max(1, Math.floor((start + (end - start) / 2.0) / 5));
      return this.preview_.replace('000001.jpg', `${pad(idx, 6)}.jpg`);
    } else {
      return this.preview_.replace('000001.jpg', `${pad(1, 6)}.jpg`);
    }
  }

  protected range2text_(start: number, end: number) {
    const idx1 = this.search_(start);
    const idx2 = this.search_(end);
    return this.transcript_
      .slice(idx1, idx2 + 1)
      .map(value => value.text)
      .join(' ');
  }

  protected search_(timestamp: number) {
    let low = 0;
    let high = this.transcript_.length;
    while (low < high) {
      const mid = Math.round(low + (high - low) / 2);
      if (this.transcript_[mid] === undefined) {
        return low;
      } else {
        if (
          this.transcript_[mid].start <= timestamp &&
          this.transcript_[mid].end >= timestamp
        ) {
          return mid;
        } else if (this.transcript_[mid].end < timestamp) {
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }
    }
    return low;
  }

  protected hex2rgb(color: string, text: string): string {
    switch (color) {
      case '#e32990':
        return '#e32990';
      case '#28a3dc':
        return '#28a3dc';
      case '#4cba35':
        return '#4cba35';
      case '#fff110':
        return '#fff110';
      default:
        return '#ffffff';
    }
  }

  protected transcript2lut_(transcript: {
    text: string;
    start: number;
    end: number;
  }) {
    const { text, start, end } = transcript;
    const textArray = text.split(' ');
    const length = textArray.length;
    const interval: number = (end - start) / length;
    return textArray.map((text, i) => ({
      text,
      start: Number((start + interval * i).toFixed(3)),
      end: Number((start + interval * (i + 1)).toFixed(3))
    }));
  }

  protected date2ios_(): string {
    return new Date().toISOString();
  }

  protected sort(
    annotations: {
      id: string;
      text: string;
      color: string;
      start: number;
      end: number;
    }[]
  ): {
    id: string;
    text: string;
    color: string;
    start: number;
    end: number;
  }[] {
    annotations.sort((a, b) => a.start - b.start);
    return annotations;
  }
}
