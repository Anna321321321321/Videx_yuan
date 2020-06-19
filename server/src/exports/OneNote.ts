import fetch from 'node-fetch';
import * as refresh from 'passport-oauth2-refresh';
import Export from './Export';
import IExport from './IExport';

export default class OneNote extends Export implements IExport {
  public get(): any {
    throw new Error('Method not implemented.');
  }

  private token_: string;

  public async send(): Promise<any> {
    return await this.post_();
  }

  constructor(
    token: string,
    courseId: string,
    lessonId: string,
    name: string,
    preview: string,
    transcript: { start: number; end: number; text: string }[]
  ) {
    super(courseId, lessonId, name, preview, transcript);
    this.token_ = token;
  }

  private async post_(): Promise<any> {
    // prettier-ignore
    const token = await new Promise<boolean>((resolve, reject) => {
      refresh.requestNewAccessToken('msft', this.token_, function(err, accessToken) {
        if (err || !accessToken) {
          resolve(null);
        }
        resolve(accessToken);
      });
    });
    if (!token) {
      return false;
    }

    const authToken = 'Bearer ' + token;
    const request = await fetch(
      'https://graph.microsoft.com/v1.0/me/onenote/pages',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'text/html',
          Authorization: authToken
        },
        body: this.payload_
      }
    );
    return request;
  }

  private template_(annotation: {
    id: string;
    text: string;
    color: string;
    start: number;
    end: number;
  }): string {
    const color = this.hex2rgb(annotation.color, annotation.text);
    // prettier-ignore
    return `<div data-id="annotations-${annotation.id}"><img src="${this.imageLink_(annotation.start, annotation.end)}" width="240" height="150"/><div data-id="annotations-${annotation.id}-interval">From ${annotation.start} Seconds To ${annotation.end} Seconds</div>${annotation.text ? `<div data-id="annotations-${annotation.id}-text" style="background-color:${color}">Note: ${annotation.text}</div>` : ''}${annotation.start !== annotation.end ? `<div data-id="annotations-${annotation.id}-transcript" style="background-color:${color}">Transcript: ${this.range2text_(annotation.start, annotation.end)}</div>` : ''}</div>`;
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
    // prettier-ignore
    this.payload_ = `<!DOCTYPE html><html><head><title>${this.name_}</title><meta name=\"created\" content=\"${this.date2ios_()}"\"/></head><body><div data-id="annotations-div">${annotations.map(annotation => this.template_(annotation)).reduce((value: string, annotation: string) => value + annotation, "")}</div></body></html>`;
  }
}
