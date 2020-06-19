export default function mergeAnnotationTranscript(annotation, transcript) {
  const text = transcript
    .map(transcript => {
      const helper = ({ start, end, text }) => {
        const textArray = text.split(' ');
        const length = textArray.length;
        const interval: number = (end - start) / length;
        return textArray.map((text, i) => ({
          text,
          start: Number((start + interval * i).toFixed(3)),
          end: Number((start + interval * (i + 1)).toFixed(3))
        }));
      };
      return helper(transcript);
    })
    .reduce(
      (aggregator: { text: string; start: number; end: number }[], value) => [
        ...aggregator,
        ...value
      ],
      []
    )
    .filter(
      value => value.start >= annotation.start && value.end <= annotation.end
    )
    .reduce((aggregator, value) => aggregator + ' ' + value.text, '')
    .substring(1);
  return text;
}
