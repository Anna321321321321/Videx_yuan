export const buildLookupTable = (transcript: {
  text: string;
  range: { start: number; end: number };
}) => {
  const { text } = transcript;
  const { start, end } = transcript.range;
  const textArray = text.split(' ');
  const length = textArray.length;
  const interval: number = (end - start) / length;
  let index = 0;
  return textArray.map((text, i) => {
    const result = {
      text,
      start: Number((start + interval * i).toFixed(3)),
      end: Number((start + interval * (i + 1)).toFixed(3)),
      head: index,
      tail: index + text.length
    };
    index += text.length + 1;
    return result;
  });
};

export const divider = (
  transcript: { text: string; range: { start: number; end: number } },
  range: { start: number; end: number },
  fn: Function
) => {
  if (
    transcript.range.start > range.end ||
    transcript.range.end < range.start
  ) {
    return [transcript];
  }
  const table = buildLookupTable(transcript);

  // original range start & end
  const rangeStart =
    range.start < transcript.range.start ? transcript.range.start : range.start;
  const rangeEnd =
    range.end > transcript.range.end ? transcript.range.end : range.end;

  // need to round range to correct value
  const startWord = table.find(
    value => value.start <= rangeStart && value.end > rangeStart
  );
  const endWord = table.find(
    value => value.start <= rangeEnd && value.end >= rangeEnd
  );

  const index0 = 0;
  const index1 = startWord.head;
  const index2 = endWord.tail;
  const index3 = transcript.text.length;

  const result = [];
  result.push({
    ...transcript,
    text: transcript.text.substring(index0, index1).trim(),
    range: {
      start: transcript.range.start,
      end: startWord.start
    }
  });
  result.push(
    fn({
      ...transcript,
      text: transcript.text.substring(index1, index2 + 1).trim(),
      range: {
        start: startWord.start,
        end: endWord.end
      }
    })
  );
  result.push({
    ...transcript,
    text: transcript.text.substring(index2 + 1, index3).trim(),
    range: {
      start: endWord.end,
      end: transcript.range.end
    }
  });
  return result.filter(data => data.text !== '');
};
