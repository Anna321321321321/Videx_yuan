import immutable, { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const INITIAL_STATE: immutable.Map<any, any> = fromJS({
  metadata: {
    courseId: '001',
    lessonId: '001'
  },
  name: 'ViDeX Demo',
  duration: null,
  transcript: {
    text: [
      {
        start: 1.35,
        end: 12.09,
        text:
          "Hello I'm Christina Hendricks and in this short video I'll be talking about a version of the trolley problem that you deserve as Thompson calls fat man in her article from 1985 called the trolley problem.\r"
      },
      {
        start: 12.8,
        end: 23.21,
        text:
          'Introduces this version of the problem while arguing for how we can differentiate between the cases. She calls bystander at the switch and transplant as discussed in an earlier video in this series.\r'
      },
      {
        start: 24.77,
        end: 34.14,
        text:
          "Here's the situation a bystander. Caesar runaway trolley, hurtling down a track. He sees the driver attempt to put on the brakes. The brakes fail in the driver faint.\r"
      },
      {
        start: 34.86,
        end: 48.81,
        text:
          "In Thompson's bystander at the switch example. The bystander can move a lever in switch the trolley onto a side track that will lead to the death of one person instead of 5. Here, there are no side tracks. But the bystanders on a bridge with a very large person in front of him.\r"
      },
      {
        start: 49.51,
        end: 59.92,
        text:
          'The question is, is it morally permissible for the bystander to push the large person onto the tracks, thereby causing the trolley to kill one person instead of letting it go ahead on its path and killing 5.\r'
      },
      {
        start: 60.95,
        end: 71.3,
        text:
          'Note that the situation is similar in many respects to bystander at the switch in both cases, the bystander does something to cause the death of one person but thereby avoids the death of 5 others.\r'
      },
      {
        start: 72.46,
        end: 103.46,
        text:
          "Several polls have shown that many people think, though, that pushing them in onto the tracks is not permissible the first 2 results on the left are from polls in 2006. The one on the right reflects what I saw when I engaged in an interactive case study on philosophy experiments com. They said that if those who had also done the case study 61%, said that it's not permissible to push the large person onto the track note, though, that the yes answer may be higher here because people may do the interactive case study more than once, to see what happens if they answer differently.\r"
      },
      {
        start: 104.27,
        end: 116.15,
        text:
          'Remember from an earlier video in this series? How many people said they thought the bystander may flip the switch many people said that it was morally permissible while saying the pushing the large person onto the tracks is not.\r'
      },
      {
        start: 116.19,
        end: 127.15,
        text:
          'Also stipulates in her article that pushing a large man onto the tracks is not morally permissible whereas it would be morally permissible for a bystander to flip a switch to move the trolley onto a track where it will kill one person.\r'
      },
      {
        start: 128.58,
        end: 140.98,
        text:
          'But what is the difference between pulling a lever to switch a track thus leading to the death of one person but avoiding the death of 5, pushing someone onto the tracks. Thus leading to the death of one person but avoiding the death of 5.\r'
      },
      {
        start: 141.64,
        end: 152.92,
        text:
          "See that in the bystander at the switch case. The bystander less directly kills the one person and that they're just pulling a switch whereas in the large person case. The bystanders seems to be more directly killing the person.\r"
      },
      {
        start: 153.93,
        end: 171.78,
        text:
          'But why should it make a moral difference if one pulls a lever versus pushing a person psychologically. It certainly does make a difference. For many people if they are directly touching the person or pulling a lever from further away but should this make a moral difference. When the bystander is the one responsible for the death of the one person in either case.\r'
      },
      {
        start: 172.8,
        end: 184.91,
        text:
          'In her 1985 article called the trolley problem Judith Jarvis Thompson explains the difference between the bystander pulling a lever to switch the trolleys tracks, pushing a large person onto the tracks by reference to write.\r'
      },
      {
        start: 185.93,
        end: 222.76,
        text:
          "Thompson argues that the action of pulling a lever in the action of pushing a person or importantly different in that one violate someone's rights and the other doesn't. It's important to note here that she's talking about the actual actions of pulling a lever or pushing someone true than in either case. One is killing a person we might want to say that doing so through any action in this situation is a violation of their right to life in her 1985 article. Thompson says it may be possible to argue that either way of killing one person in the trolley problem violates their right to life. But in the case of pulling the lever. This is morally acceptable but not in the case of pushing someone off a bridge.\r"
      },
      {
        start: 223.77,
        end: 233.78,
        text:
          'The differences in the kind of action. One actually performs as Thompson puts it showing a person is infringing a right of his so also is toppling a person of a footbridge.\r'
      },
      {
        start: 234.39,
        end: 244.23,
        text:
          "And this is the case, she notes even if doing so doesn't result in any injury or death for the person shoved just pushing them off a footbridge in itself violates a rite of theirs.\r"
      },
      {
        start: 244.99,
        end: 277.98,
        text:
          "Now, she doesn't go into why this is the case in her article. And it's of courses, disputable but it is possible. I think to say that one has a right that someone else, not intentionally push one off a bridge of courses. This can be overridden in cases where doing so is necessary to save one's life and it's also possible to say as Thompson does pulling a lever to make a trolley switch trucks is not itself an infringement of the right of anybody. The bystander could pull the lever turn the trolley in there be no one on the other truck. The action of pulling the lever and turning the trolley by itself doesn't infringe a right.\r"
      },
      {
        start: 278.71,
        end: 287.4,
        text:
          "So pushing a person violates a right, but pulling a lever does not, and that's why pushing the large person onto the track is not morally permissible, according to Thomson.\r"
      },
      {
        start: 288.43,
        end: 300.76,
        text:
          'That is how in her 1985 article. Thompson differentiated between the trolley problems involving a bystander at the switch pushing a large person off a bridge. The bystander may flip the switch, but not push the person.\r'
      },
      {
        start: 301.72,
        end: 313.95,
        text:
          'But Thompson wrote about the trolley problem again in an article published in 2008 and she changed her mind about whether the bystander is Morley permitted to turn the trolley in the first-place the questions raised by the trolley problem or not yet settled.\r'
      }
    ],
    file:
      'https://ubcvidexmediastorage.blob.core.windows.net/asset-8b9a85f9-2a7b-4bd5-ab27-f5223d49b644/bbb1bc32-3d34-4aaf-a2a5-e084a3362962_aud_SpReco.vtt?sv=2015-07-08&sr=c&si=998f2ab7-6e3e-457a-b365-c52a1ae1e77b&sig=LwYbiUBYChX%2FefLPrDYmuadORI3k0t5eYTqAQFIiCBI%3D&st=2018-08-07T22%3A28%3A29Z&se=2118-07-14T22%3A28%3A29Z'
  },
  video: {
    streaming:
      'https://ubcvidexmedia.streaming.mediaservices.windows.net/287cf3bb-dd76-4f56-88ca-b0746de93ea0/bbb1bc32-3d34-4aaf-a2a5-e084a336.ism/manifest(format=m3u8-aapl)',
    download:
      'https://ubcvidexmediastorage.blob.core.windows.net/asset-13a0a023-1c08-45ec-bee1-d8746c5fa66e/bbb1bc32-3d34-4aaf-a2a5-e084a336.mp4?sv=2015-07-08&sr=c&si=4b0f4bf8-bb6f-40eb-9d85-56fcfce90ba0&sig=jdncv8yTxn2LlW2nlxpyMZnbCnGzPsLZCRdcLfZkzB4%3D&st=2018-08-07T22%3A28%3A02Z&se=2118-07-14T22%3A28%3A02Z'
  },
  thumbnail: {
    url:
      'https://ubcvidexmediastorage.blob.core.windows.net/asset-a65fdbf5-f04b-431b-b8ea-04f807d8d2fe/',
    height: 360,
    width: 480,
    sas:
      'sv=2015-07-08&sr=c&si=7c44f0d4-5376-409f-8c07-a800aac73a7e&sig=4yXw97%2FwBKYc9XDnXmNHARy%2F65X%2B%2BMC6XB%2F44QiyDRA%3D&st=2018-08-07T22%3A28%3A11Z&se=2118-07-14T22%3A28%3A11Z'
  },
  isInitialized: true
});

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.INIT:
      return state.merge(action.payload).set('isInitialized', true);

    case actionTypes.DEINIT:
      return INITIAL_STATE;

    case actionTypes.SET_DURATION:
      return state.set('duration', action.payload.duration);

    default:
      return state;
  }
};
