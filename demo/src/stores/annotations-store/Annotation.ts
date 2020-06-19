import uuid from 'uuid';

export default class Annotation {
  private id: string;
  private text: string;
  private color: string;
  private readonly start: number;
  private readonly end: number;
  private share: boolean;
  private readonly reaction: {
    counter: number;
    likeable: boolean;
  };
  private readonly metadata: {
    editable: boolean;
  };
  private loading: boolean;
  private transcript: string;

  public setId(id: string) {
    this.id = id;
  }

  public setText(text: string) {
    this.text = text;
  }

  public setTranscript(transcript: string) {
    this.transcript = transcript;
  }

  public setColor(color: string) {
    this.color = color;
  }

  public setShare(share: boolean) {
    this.share = share;
  }

  public likeAnnotation() {
    this.reaction.counter += 1;
    this.reaction.likeable = false;
  }

  public unlikeAnnotation() {
    this.reaction.counter -= 1;
    this.reaction.likeable = true;
  }

  public setLoading(loading: boolean): void {
    this.loading = loading;
  }

  public toObject(): {
    id: string;
    text: string;
    color: string;
    start: number;
    end: number;
    share: boolean;
    reaction: {
      counter: number;
      likeable: boolean;
    };
    metadata: {
      editable: boolean;
    };
    loading: boolean;
    transcript: string;
  } {
    return {
      id: this.id,
      text: this.text,
      color: this.color,
      start: this.start,
      end: this.end,
      share: this.share,
      reaction: this.reaction,
      metadata: this.metadata,
      loading: this.loading,
      transcript: this.transcript
    };
  }

  public static fromServer(data: any): Annotation {
    return new Annotation(
      data.id,
      data.text,
      data.color,
      data.start,
      data.end,
      data.share,
      data.reaction,
      data.metadata,
      false
    );
  }

  public toServer(): {
    text: string;
    color: string;
    start: number;
    end: number;
  } {
    return {
      text: this.text,
      color: this.color,
      start: this.start,
      end: this.end
    };
  }

  public static create(
    text: string,
    color: string,
    start: number,
    end: number
  ): Annotation {
    return new Annotation(
      uuid.v4(), //generate uuid since we are not using database
      text,
      color,
      start,
      end,
      false,
      { counter: 0, likeable: false },
      { editable: true },
      false
    );
  }

  private constructor(
    id: string,
    text: string,
    color: string,
    start: number,
    end: number,
    share: boolean,
    reaction: { counter: number; likeable: boolean },
    metadata: { editable: boolean },
    loading: boolean
  ) {
    this.id = id;
    this.text = text;
    this.color = color;
    this.start = start;
    this.end = end;
    this.share = share;
    this.reaction = reaction;
    this.metadata = metadata;
    this.loading = loading;
  }
}
