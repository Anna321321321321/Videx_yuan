import fetch from 'node-fetch';
import Export from './Export';
import IExport from './IExport';

export default class PDF extends Export implements IExport {
  public async send(): Promise<boolean> {
    return await this.post_();
  }

  public get(): any {
    return this.result_;
  }

  private async post_(): Promise<boolean> {
    const request = await fetch('http://jsreport:5488/api/report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.payload_)
    });
    if (request.ok) {
      this.result_ = await request.buffer();
      return true;
    } else {
      return false;
    }
  }

  protected hex2rgb(color: string, text: string): string {
    if (text) {
      switch (color) {
        case '#e32990':
          return 'p-3 mb-2 alert alert-danger text-dark';
        case '#28a3dc':
          return 'p-3 mb-2 alert alert-primary text-dark';
        case '#4cba35':
          return 'p-3 mb-2 alert alert-success text-dark';
        case '#fff110':
          return 'p-3 mb-2 alert alert-warning text-dark';
        default:
          return 'p-3 mb-2 bg-white text-dark';
      }
    } else {
      switch (color) {
        case '#e32990':
          return 'p-3 mb-2 border border-danger text-dark';
        case '#28a3dc':
          return 'p-3 mb-2 border border-primary text-dark';
        case '#4cba35':
          return 'p-3 mb-2 border border-success text-dark';
        case '#fff110':
          return 'p-3 mb-2 border border-warning text-dark';
        default:
          return 'p-3 mb-2 bg-white text-dark';
      }
    }
  }
  protected secondsToHms(d) {
    d = Number(d);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);

    var mDisplay = m + ' m ';
    var sDisplay = s + ' s';
    return mDisplay + sDisplay;
  }

  private template_(annotation: {
    id: string;
    text: string;
    color: string;
    start: number;
    end: number;
  }): {
    id: string;
    color: string;
    text: string;
    transcript: string;
    image: string;
    start: string;
    end: string;
  } {
    // prettier-ignore
    return {
      id: annotation.id,
      text: annotation.text,
      color: this.hex2rgb(annotation.color, annotation.text),
      transcript: annotation.start !== annotation.end ? this.range2text_(annotation.start, annotation.end): null,
      image: this.imageLink_(annotation.start, annotation.end),
      start: this.secondsToHms(annotation.start),
      end: this.secondsToHms(annotation.end),
    };
  }

  public async build(
    annotations: {
      id: string;
      text: string;
      color: string;
      start: number;
      end: number;
    }[]
  ): Promise<void> {
    annotations = this.sort(annotations);
    this.payload_ = {
      template: { name: 'annotation-template' },
      data: {
        name: this.name_,
        annotations: annotations.map(annotation => this.template_(annotation))
      }
    };
  }
}
