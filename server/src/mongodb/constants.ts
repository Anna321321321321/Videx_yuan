export const DEV_STAGING_DB = {
  User: [
    {
      _id: 'de6f21a7-7798-4555-b04d-0fa647722b57',
      type: 0,
      school: 0
    },
    {
      _id: '7a0ab78f-6b8a-4dd5-923b-beedd836a08a',
      type: 0,
      school: 0
    },
    {
      _id: '46bf1e47-bd1f-40a8-b7b3-8f8781c04077',
      type: 1,
      school: 0
    }
  ],
  Course: [
    {
      _id: '00000000-0000-0001-0000-000000000001',
      userId: '46bf1e47-bd1f-40a8-b7b3-8f8781c04077',
      name: 'PHIL101 - Introduction to Philosophy',
      releaseDate: new Date(2017, 8, 1),
      token: 'H5QBCMZR',
      subscribers: ['de6f21a7-7798-4555-b04d-0fa647722b57']
    },
    {
      _id: '00000000-0000-0001-0000-000000000002',
      userId: '46bf1e47-bd1f-40a8-b7b3-8f8781c04077',
      name: 'PHIL102 - Introduction to Philosophy II',
      releaseDate: new Date(2017, 9, 1),
      token: 'P26EsJQs',
      subscribers: ['de6f21a7-7798-4555-b04d-0fa647722b57']
    }
  ],
  Lesson: [
    {
      _id: '00000000-0001-0000-0000-000000000001',
      name: 'The Trolley Problem',
      courseId: '00000000-0000-0001-0000-000000000001',
      releaseDate: new Date(2017, 8, 1),
      publish: true,
      category: 'default',
      keywords: [],
      summary: 'Lecture on the famous Trolley Problem',
      status: 4,
      duration: 315.1,
      azure: {
        assetsId: {
          inputAssetId: 'a',
          encodingAssetId: 'b',
          indexAssetId: 'c',
          thumbnailAssetId: 'd',
          offlineAssetId: 'e'
        },
        jobId: 'f'
      },
      video: {
        streaming:
          'https://videxdevmedia-caea.streaming.media.azure.net/691cb183-8e62-4023-bebb-4c4b675ca1a1/7c1fdb17-779c-4327-b186-5037c4e0.ism/manifest(format=m3u8-aapl)',
        download:
          'https://ubcdevmediastorage.blob.core.windows.net/asset-4e1be895-707a-43b5-a35f-d78ece127957/7c1fdb17-779c-4327-b186-5037c4e0.mp4?sv=2017-04-17&sr=c&si=072b2c8b-e205-42e6-a1b4-9362c51bf522&sig=Pu2vBD5AEnCmahhwsMHE23MHBFt1Sw2zURAKWJw7yPg%3D&st=2019-08-16T23%3A58%3A18Z&se=2119-07-23T23%3A58%3A18Z'
      },
      transcript: {
        text:
          "WEBVTT\r\n\r\n00:00:01.350 --> 00:00:12.090\r\nHello I'm Christina Hendricks and in this short video I'll be talking about a version of the trolley problem that you deserve as Thompson calls fat man in her article from 1985 called the trolley problem.\r\n\r\n00:00:12.800 --> 00:00:23.210\r\nIntroduces this version of the problem while arguing for how we can differentiate between the cases. She calls bystander at the switch and transplant as discussed in an earlier video in this series.\r\n\r\n00:00:24.770 --> 00:00:34.140\r\nHere's the situation a bystander. Caesar runaway trolley, hurtling down a track. He sees the driver attempt to put on the brakes. The brakes fail in the driver faint.\r\n\r\n00:00:34.860 --> 00:00:48.810\r\nIn Thompson's bystander at the switch example. The bystander can move a lever in switch the trolley onto a side track that will lead to the death of one person instead of 5. Here, there are no side tracks. But the bystanders on a bridge with a very large person in front of him.\r\n\r\n00:00:49.510 --> 00:00:59.920\r\nThe question is, is it morally permissible for the bystander to push the large person onto the tracks, thereby causing the trolley to kill one person instead of letting it go ahead on its path and killing 5.\r\n\r\n00:01:00.950 --> 00:01:11.300\r\nNote that the situation is similar in many respects to bystander at the switch in both cases, the bystander does something to cause the death of one person but thereby avoids the death of 5 others.\r\n\r\n00:01:12.460 --> 00:01:43.460\r\nSeveral polls have shown that many people think, though, that pushing them in onto the tracks is not permissible the first 2 results on the left are from polls in 2006. The one on the right reflects what I saw when I engaged in an interactive case study on philosophy experiments com. They said that if those who had also done the case study 61%, said that it's not permissible to push the large person onto the track note, though, that the yes answer may be higher here because people may do the interactive case study more than once, to see what happens if they answer differently.\r\n\r\n00:01:44.270 --> 00:01:56.150\r\nRemember from an earlier video in this series? How many people said they thought the bystander may flip the switch many people said that it was morally permissible while saying the pushing the large person onto the tracks is not.\r\n\r\n00:01:56.190 --> 00:02:07.150\r\nAlso stipulates in her article that pushing a large man onto the tracks is not morally permissible whereas it would be morally permissible for a bystander to flip a switch to move the trolley onto a track where it will kill one person.\r\n\r\n00:02:08.580 --> 00:02:20.980\r\nBut what is the difference between pulling a lever to switch a track thus leading to the death of one person but avoiding the death of 5, pushing someone onto the tracks. Thus leading to the death of one person but avoiding the death of 5.\r\n\r\n00:02:21.640 --> 00:02:32.920\r\nSee that in the bystander at the switch case. The bystander less directly kills the one person and that they're just pulling a switch whereas in the large person case. The bystanders seems to be more directly killing the person.\r\n\r\n00:02:33.930 --> 00:02:51.780\r\nBut why should it make a moral difference if one pulls a lever versus pushing a person psychologically. It certainly does make a difference. For many people if they are directly touching the person or pulling a lever from further away but should this make a moral difference. When the bystander is the one responsible for the death of the one person in either case.\r\n\r\n00:02:52.800 --> 00:03:04.910\r\nIn her 1985 article called the trolley problem Judith Jarvis Thompson explains the difference between the bystander pulling a lever to switch the trolleys tracks, pushing a large person onto the tracks by reference to write.\r\n\r\n00:03:05.930 --> 00:03:42.760\r\nThompson argues that the action of pulling a lever in the action of pushing a person or importantly different in that one violate someone's rights and the other doesn't. It's important to note here that she's talking about the actual actions of pulling a lever or pushing someone true than in either case. One is killing a person we might want to say that doing so through any action in this situation is a violation of their right to life in her 1985 article. Thompson says it may be possible to argue that either way of killing one person in the trolley problem violates their right to life. But in the case of pulling the lever. This is morally acceptable but not in the case of pushing someone off a bridge.\r\n\r\n00:03:43.770 --> 00:03:53.780\r\nThe differences in the kind of action. One actually performs as Thompson puts it showing a person is infringing a right of his so also is toppling a person of a footbridge.\r\n\r\n00:03:54.390 --> 00:04:04.230\r\nAnd this is the case, she notes even if doing so doesn't result in any injury or death for the person shoved just pushing them off a footbridge in itself violates a rite of theirs.\r\n\r\n00:04:04.990 --> 00:04:37.980\r\nNow, she doesn't go into why this is the case in her article. And it's of courses, disputable but it is possible. I think to say that one has a right that someone else, not intentionally push one off a bridge of courses. This can be overridden in cases where doing so is necessary to save one's life and it's also possible to say as Thompson does pulling a lever to make a trolley switch trucks is not itself an infringement of the right of anybody. The bystander could pull the lever turn the trolley in there be no one on the other truck. The action of pulling the lever and turning the trolley by itself doesn't infringe a right.\r\n\r\n00:04:38.710 --> 00:04:47.400\r\nSo pushing a person violates a right, but pulling a lever does not, and that's why pushing the large person onto the track is not morally permissible, according to Thomson.\r\n\r\n00:04:48.430 --> 00:05:00.760\r\nThat is how in her 1985 article. Thompson differentiated between the trolley problems involving a bystander at the switch pushing a large person off a bridge. The bystander may flip the switch, but not push the person.\r\n\r\n00:05:01.720 --> 00:05:13.950\r\nBut Thompson wrote about the trolley problem again in an article published in 2008 and she changed her mind about whether the bystander is Morley permitted to turn the trolley in the first-place the questions raised by the trolley problem or not yet settled.\r\n",
        file:
          'https://ubcdevmediastorage.blob.core.windows.net/asset-b11a479b-c25c-4aae-9897-1d86d22dc2c5/7c1fdb17-779c-4327-b186-5037c4e01734_aud_SpReco.vtt?sv=2017-04-17&sr=c&si=f0fef66e-22aa-4a48-a77c-56830b5389a2&sig=CX%2B6uUb%2BJW6WkaqMtM16kDzt9RykQuW0TqZq3oGiQ6Q%3D&st=2019-08-16T23%3A58%3A19Z&se=2119-07-23T23%3A58%3A19Z'
      },
      thumbnail: {
        url:
          'https://ubcdevmediastorage.blob.core.windows.net/asset-bcf82a9c-143b-49b0-9592-a29628bd2f29/',
        height: 300,
        width: 480,
        sas:
          'sv=2017-04-17&sr=c&si=328384cd-fa71-4545-8ae5-5dc697594e57&sig=YovJn1o1RXjcXUIHsZr2N%2F5eq6XG%2BJbqibA%2BU5km1Zg%3D&st=2019-08-16T23%3A58%3A20Z&se=2119-07-23T23%3A58%3A20Z'
      },
      views: []
    },
    {
      _id: '00000000-0001-0000-0000-000000000002',
      name: 'The Trolley Problem 2',
      courseId: '00000000-0000-0001-0000-000000000001',
      summary: 'Lecture on the famous Trolley Problem',
      releaseDate: new Date(2017, 8, 3),
      publish: true,
      category: 'default',
      keywords: [],
      status: 4,
      duration: 315.1,
      azure: {
        assetsId: {
          inputAssetId: 'a',
          encodingAssetId: 'b',
          indexAssetId: 'c',
          thumbnailAssetId: 'd',
          offlineAssetId: 'e'
        },
        jobId: 'f'
      },
      video: {
        streaming:
          'https://videxdevmedia-caea.streaming.media.azure.net/691cb183-8e62-4023-bebb-4c4b675ca1a1/7c1fdb17-779c-4327-b186-5037c4e0.ism/manifest(format=m3u8-aapl)',
        download:
          'https://ubcdevmediastorage.blob.core.windows.net/asset-4e1be895-707a-43b5-a35f-d78ece127957/7c1fdb17-779c-4327-b186-5037c4e0.mp4?sv=2017-04-17&sr=c&si=072b2c8b-e205-42e6-a1b4-9362c51bf522&sig=Pu2vBD5AEnCmahhwsMHE23MHBFt1Sw2zURAKWJw7yPg%3D&st=2019-08-16T23%3A58%3A18Z&se=2119-07-23T23%3A58%3A18Z'
      },
      transcript: {
        text:
          "WEBVTT\r\n\r\n00:00:01.350 --> 00:00:12.090\r\nHello I'm Christina Hendricks and in this short video I'll be talking about a version of the trolley problem that you deserve as Thompson calls fat man in her article from 1985 called the trolley problem.\r\n\r\n00:00:12.800 --> 00:00:23.210\r\nIntroduces this version of the problem while arguing for how we can differentiate between the cases. She calls bystander at the switch and transplant as discussed in an earlier video in this series.\r\n\r\n00:00:24.770 --> 00:00:34.140\r\nHere's the situation a bystander. Caesar runaway trolley, hurtling down a track. He sees the driver attempt to put on the brakes. The brakes fail in the driver faint.\r\n\r\n00:00:34.860 --> 00:00:48.810\r\nIn Thompson's bystander at the switch example. The bystander can move a lever in switch the trolley onto a side track that will lead to the death of one person instead of 5. Here, there are no side tracks. But the bystanders on a bridge with a very large person in front of him.\r\n\r\n00:00:49.510 --> 00:00:59.920\r\nThe question is, is it morally permissible for the bystander to push the large person onto the tracks, thereby causing the trolley to kill one person instead of letting it go ahead on its path and killing 5.\r\n\r\n00:01:00.950 --> 00:01:11.300\r\nNote that the situation is similar in many respects to bystander at the switch in both cases, the bystander does something to cause the death of one person but thereby avoids the death of 5 others.\r\n\r\n00:01:12.460 --> 00:01:43.460\r\nSeveral polls have shown that many people think, though, that pushing them in onto the tracks is not permissible the first 2 results on the left are from polls in 2006. The one on the right reflects what I saw when I engaged in an interactive case study on philosophy experiments com. They said that if those who had also done the case study 61%, said that it's not permissible to push the large person onto the track note, though, that the yes answer may be higher here because people may do the interactive case study more than once, to see what happens if they answer differently.\r\n\r\n00:01:44.270 --> 00:01:56.150\r\nRemember from an earlier video in this series? How many people said they thought the bystander may flip the switch many people said that it was morally permissible while saying the pushing the large person onto the tracks is not.\r\n\r\n00:01:56.190 --> 00:02:07.150\r\nAlso stipulates in her article that pushing a large man onto the tracks is not morally permissible whereas it would be morally permissible for a bystander to flip a switch to move the trolley onto a track where it will kill one person.\r\n\r\n00:02:08.580 --> 00:02:20.980\r\nBut what is the difference between pulling a lever to switch a track thus leading to the death of one person but avoiding the death of 5, pushing someone onto the tracks. Thus leading to the death of one person but avoiding the death of 5.\r\n\r\n00:02:21.640 --> 00:02:32.920\r\nSee that in the bystander at the switch case. The bystander less directly kills the one person and that they're just pulling a switch whereas in the large person case. The bystanders seems to be more directly killing the person.\r\n\r\n00:02:33.930 --> 00:02:51.780\r\nBut why should it make a moral difference if one pulls a lever versus pushing a person psychologically. It certainly does make a difference. For many people if they are directly touching the person or pulling a lever from further away but should this make a moral difference. When the bystander is the one responsible for the death of the one person in either case.\r\n\r\n00:02:52.800 --> 00:03:04.910\r\nIn her 1985 article called the trolley problem Judith Jarvis Thompson explains the difference between the bystander pulling a lever to switch the trolleys tracks, pushing a large person onto the tracks by reference to write.\r\n\r\n00:03:05.930 --> 00:03:42.760\r\nThompson argues that the action of pulling a lever in the action of pushing a person or importantly different in that one violate someone's rights and the other doesn't. It's important to note here that she's talking about the actual actions of pulling a lever or pushing someone true than in either case. One is killing a person we might want to say that doing so through any action in this situation is a violation of their right to life in her 1985 article. Thompson says it may be possible to argue that either way of killing one person in the trolley problem violates their right to life. But in the case of pulling the lever. This is morally acceptable but not in the case of pushing someone off a bridge.\r\n\r\n00:03:43.770 --> 00:03:53.780\r\nThe differences in the kind of action. One actually performs as Thompson puts it showing a person is infringing a right of his so also is toppling a person of a footbridge.\r\n\r\n00:03:54.390 --> 00:04:04.230\r\nAnd this is the case, she notes even if doing so doesn't result in any injury or death for the person shoved just pushing them off a footbridge in itself violates a rite of theirs.\r\n\r\n00:04:04.990 --> 00:04:37.980\r\nNow, she doesn't go into why this is the case in her article. And it's of courses, disputable but it is possible. I think to say that one has a right that someone else, not intentionally push one off a bridge of courses. This can be overridden in cases where doing so is necessary to save one's life and it's also possible to say as Thompson does pulling a lever to make a trolley switch trucks is not itself an infringement of the right of anybody. The bystander could pull the lever turn the trolley in there be no one on the other truck. The action of pulling the lever and turning the trolley by itself doesn't infringe a right.\r\n\r\n00:04:38.710 --> 00:04:47.400\r\nSo pushing a person violates a right, but pulling a lever does not, and that's why pushing the large person onto the track is not morally permissible, according to Thomson.\r\n\r\n00:04:48.430 --> 00:05:00.760\r\nThat is how in her 1985 article. Thompson differentiated between the trolley problems involving a bystander at the switch pushing a large person off a bridge. The bystander may flip the switch, but not push the person.\r\n\r\n00:05:01.720 --> 00:05:13.950\r\nBut Thompson wrote about the trolley problem again in an article published in 2008 and she changed her mind about whether the bystander is Morley permitted to turn the trolley in the first-place the questions raised by the trolley problem or not yet settled.\r\n",
        file:
          'https://ubcdevmediastorage.blob.core.windows.net/asset-42df03d5-7052-4fcd-a438-9b663948a3af/0e28284c-8e70-4407-b49b-947468e62359_aud_SpReco.vtt?sv=2015-07-08&sr=c&si=976d0fcc-609b-4380-ba99-1e6c3d419170&sig=YMZedXFqyNVSJsuN1Kbb6SPDXrOjWl1qQMPtLnmjEqw%3D&st=2018-07-03T15%3A45%3A55Z&se=2118-06-09T15%3A45%3A55Z'
      },
      thumbnail: {
        url:
          'https://ubcdevmediastorage.blob.core.windows.net/asset-bcf82a9c-143b-49b0-9592-a29628bd2f29/',
        height: 300,
        width: 480,
        sas:
          'sv=2017-04-17&sr=c&si=328384cd-fa71-4545-8ae5-5dc697594e57&sig=YovJn1o1RXjcXUIHsZr2N%2F5eq6XG%2BJbqibA%2BU5km1Zg%3D&st=2019-08-16T23%3A58%3A20Z&se=2119-07-23T23%3A58%3A20Z'
      },
      views: []
    },
    {
      _id: '00000000-0001-0000-0000-000000000003',
      name: 'The Trolley Problem 3',
      courseId: '00000000-0000-0001-0000-000000000002',
      summary: 'Lecture on the famous Trolley Problem',
      releaseDate: new Date(2017, 9, 1),
      publish: true,
      category: 'default',
      keywords: [],
      status: 4,
      duration: 315.1,
      azure: {
        assetsId: {
          inputAssetId: 'a',
          encodingAssetId: 'b',
          indexAssetId: 'c',
          thumbnailAssetId: 'd',
          offlineAssetId: 'e'
        },
        jobId: 'f'
      },
      video: {
        streaming:
          'https://videxdevmedia-caea.streaming.media.azure.net/7bc95c58-b233-46ad-8f28-d9fbea0a2cf2/34cde039-ace3-445e-8a67-bfc30bf3.ism/manifest(format=m3u8-aapl)',
        download:
          'https://ubcdevmediastorage.blob.core.windows.net/asset-3d4fd141-8b9b-4750-b9c5-768c65e5c60f/34cde039-ace3-445e-8a67-bfc30bf3.mp4?sv=2017-04-17&sr=c&si=00994c97-f642-4758-9f03-c614e4265ee0&sig=K26YmuGyeBZHInCTjnNMTHpMG8iSP4JKmH2m302AvY4%3D&st=2019-08-17T00%3A59%3A35Z&se=2119-07-24T00%3A59%3A35Z'
      },
      transcript: {
        text:
          "WEBVTT\r\n\r\n00:00:01.350 --> 00:00:12.090\r\nHello I'm Christina Hendricks and in this short video I'll be talking about a version of the trolley problem that you deserve as Thompson calls fat man in her article from 1985 called the trolley problem.\r\n\r\n00:00:12.800 --> 00:00:23.210\r\nIntroduces this version of the problem while arguing for how we can differentiate between the cases. She calls bystander at the switch and transplant as discussed in an earlier video in this series.\r\n\r\n00:00:24.770 --> 00:00:34.140\r\nHere's the situation a bystander. Caesar runaway trolley, hurtling down a track. He sees the driver attempt to put on the brakes. The brakes fail in the driver faint.\r\n\r\n00:00:34.860 --> 00:00:48.810\r\nIn Thompson's bystander at the switch example. The bystander can move a lever in switch the trolley onto a side track that will lead to the death of one person instead of 5. Here, there are no side tracks. But the bystanders on a bridge with a very large person in front of him.\r\n\r\n00:00:49.510 --> 00:00:59.920\r\nThe question is, is it morally permissible for the bystander to push the large person onto the tracks, thereby causing the trolley to kill one person instead of letting it go ahead on its path and killing 5.\r\n\r\n00:01:00.950 --> 00:01:11.300\r\nNote that the situation is similar in many respects to bystander at the switch in both cases, the bystander does something to cause the death of one person but thereby avoids the death of 5 others.\r\n\r\n00:01:12.460 --> 00:01:43.460\r\nSeveral polls have shown that many people think, though, that pushing them in onto the tracks is not permissible the first 2 results on the left are from polls in 2006. The one on the right reflects what I saw when I engaged in an interactive case study on philosophy experiments com. They said that if those who had also done the case study 61%, said that it's not permissible to push the large person onto the track note, though, that the yes answer may be higher here because people may do the interactive case study more than once, to see what happens if they answer differently.\r\n\r\n00:01:44.270 --> 00:01:56.150\r\nRemember from an earlier video in this series? How many people said they thought the bystander may flip the switch many people said that it was morally permissible while saying the pushing the large person onto the tracks is not.\r\n\r\n00:01:56.190 --> 00:02:07.150\r\nAlso stipulates in her article that pushing a large man onto the tracks is not morally permissible whereas it would be morally permissible for a bystander to flip a switch to move the trolley onto a track where it will kill one person.\r\n\r\n00:02:08.580 --> 00:02:20.980\r\nBut what is the difference between pulling a lever to switch a track thus leading to the death of one person but avoiding the death of 5, pushing someone onto the tracks. Thus leading to the death of one person but avoiding the death of 5.\r\n\r\n00:02:21.640 --> 00:02:32.920\r\nSee that in the bystander at the switch case. The bystander less directly kills the one person and that they're just pulling a switch whereas in the large person case. The bystanders seems to be more directly killing the person.\r\n\r\n00:02:33.930 --> 00:02:51.780\r\nBut why should it make a moral difference if one pulls a lever versus pushing a person psychologically. It certainly does make a difference. For many people if they are directly touching the person or pulling a lever from further away but should this make a moral difference. When the bystander is the one responsible for the death of the one person in either case.\r\n\r\n00:02:52.800 --> 00:03:04.910\r\nIn her 1985 article called the trolley problem Judith Jarvis Thompson explains the difference between the bystander pulling a lever to switch the trolleys tracks, pushing a large person onto the tracks by reference to write.\r\n\r\n00:03:05.930 --> 00:03:42.760\r\nThompson argues that the action of pulling a lever in the action of pushing a person or importantly different in that one violate someone's rights and the other doesn't. It's important to note here that she's talking about the actual actions of pulling a lever or pushing someone true than in either case. One is killing a person we might want to say that doing so through any action in this situation is a violation of their right to life in her 1985 article. Thompson says it may be possible to argue that either way of killing one person in the trolley problem violates their right to life. But in the case of pulling the lever. This is morally acceptable but not in the case of pushing someone off a bridge.\r\n\r\n00:03:43.770 --> 00:03:53.780\r\nThe differences in the kind of action. One actually performs as Thompson puts it showing a person is infringing a right of his so also is toppling a person of a footbridge.\r\n\r\n00:03:54.390 --> 00:04:04.230\r\nAnd this is the case, she notes even if doing so doesn't result in any injury or death for the person shoved just pushing them off a footbridge in itself violates a rite of theirs.\r\n\r\n00:04:04.990 --> 00:04:37.980\r\nNow, she doesn't go into why this is the case in her article. And it's of courses, disputable but it is possible. I think to say that one has a right that someone else, not intentionally push one off a bridge of courses. This can be overridden in cases where doing so is necessary to save one's life and it's also possible to say as Thompson does pulling a lever to make a trolley switch trucks is not itself an infringement of the right of anybody. The bystander could pull the lever turn the trolley in there be no one on the other truck. The action of pulling the lever and turning the trolley by itself doesn't infringe a right.\r\n\r\n00:04:38.710 --> 00:04:47.400\r\nSo pushing a person violates a right, but pulling a lever does not, and that's why pushing the large person onto the track is not morally permissible, according to Thomson.\r\n\r\n00:04:48.430 --> 00:05:00.760\r\nThat is how in her 1985 article. Thompson differentiated between the trolley problems involving a bystander at the switch pushing a large person off a bridge. The bystander may flip the switch, but not push the person.\r\n\r\n00:05:01.720 --> 00:05:13.950\r\nBut Thompson wrote about the trolley problem again in an article published in 2008 and she changed her mind about whether the bystander is Morley permitted to turn the trolley in the first-place the questions raised by the trolley problem or not yet settled.\r\n",
        file:
          'https://ubcdevmediastorage.blob.core.windows.net/asset-b7d61542-3b65-4627-a2cf-b9bd592630c7/34cde039-ace3-445e-8a67-bfc30bf387e8_aud_SpReco.vtt?sv=2017-04-17&sr=c&si=de7159d4-9dd9-4f4f-acdc-412fadc4b810&sig=QkDp0dDl4K25GaDcC7Q5tl2X%2FdBCod0RpKQEzW1qBXc%3D&st=2019-08-17T00%3A59%3A36Z&se=2119-07-24T00%3A59%3A36Z'
      },
      thumbnail: {
        url:
          'https://ubcdevmediastorage.blob.core.windows.net/asset-2248ef1b-08e5-4c42-b112-86a3b877e4b4/',
        height: 300,
        width: 480,
        sas:
          'sv=2017-04-17&sr=c&si=90267183-592b-4de9-823e-ab00ed10e306&sig=fV3haeLyMpjuEjOb9qv0pJzbaTF4XNrRvsV4UEjBesE%3D&st=2019-08-17T00%3A59%3A37Z&se=2119-07-24T00%3A59%3A37Z'
      },
      views: []
    }
  ]
};

export const TEST_UUID = {
  user: {
    student1: 'de6f21a7-7798-4555-b04d-0fa647722b57',
    student2: '7a0ab78f-6b8a-4dd5-923b-beedd836a08a',
    teacher1: '46bf1e47-bd1f-40a8-b7b3-8f8781c04077',
    teacher2: 'ed92ec93-fcae-4ed9-8bd7-b30ea23aec59',
    administrator1: '18cfe3bd-18e9-48af-98fb-dde0592623e9'
  },
  course: {
    course1: '00000000-0000-0001-0000-000000000001',
    course2: '00000000-0000-0001-0000-000000000002'
  },
  lesson: {
    lesson1: '00000000-0001-0000-0000-000000000001',
    lesson2: '00000000-0001-0000-0000-000000000002'
  },
  annotation: {
    annotation1: '35d7a665-d2cd-43ff-b103-47b3edd89942',
    annotation2: '1002057c-dbff-4f93-9238-ea64a3e2be55'
  }
};

export const TEST_DB = {
  User: [
    {
      _id: TEST_UUID.user.student1,
      type: 0,
      school: 0
    },
    {
      _id: TEST_UUID.user.student2,
      type: 0,
      school: 1
    },
    {
      _id: TEST_UUID.user.teacher1,
      type: 1,
      school: 0
    },
    {
      _id: TEST_UUID.user.teacher2,
      type: 1,
      school: 0
    },
    {
      _id: TEST_UUID.user.administrator1,
      type: 2,
      school: 0
    }
  ],
  Course: [
    {
      _id: TEST_UUID.course.course1,
      name: 'PHIL101 - Introduction to Philosophy',
      releaseDate: new Date(2017, 8, 1),
      token: 'H5QBCMZR'
    },
    {
      _id: TEST_UUID.course.course2,
      name: 'PHIL102 - Introduction to Philosophy 2',
      releaseDate: new Date(2017, 9, 1),
      token: 'P26EsJQs'
    }
  ],
  Lesson: [
    {
      _id: TEST_UUID.lesson.lesson1,
      name: 'The Trolley Problem',
      userId: TEST_UUID.user.teacher1,
      summary: 'Lecture on the famous Trolley Problem',
      status: 4,
      duration: 315.1,
      azure: {
        assetsId: {
          inputAssetId: 'a',
          encodingAssetId: 'b',
          indexAssetId: 'c',
          thumbnailAssetId: 'd',
          offlineAssetId: 'e'
        },
        jobId: 'f'
      },
      video: {
        streaming:
          'https://videxdevmedia-caea.streaming.media.azure.net/691cb183-8e62-4023-bebb-4c4b675ca1a1/7c1fdb17-779c-4327-b186-5037c4e0.ism/manifest(format=m3u8-aapl)',
        download:
          'https://ubcdevmediastorage.blob.core.windows.net/asset-4e1be895-707a-43b5-a35f-d78ece127957/7c1fdb17-779c-4327-b186-5037c4e0.mp4?sv=2017-04-17&sr=c&si=072b2c8b-e205-42e6-a1b4-9362c51bf522&sig=Pu2vBD5AEnCmahhwsMHE23MHBFt1Sw2zURAKWJw7yPg%3D&st=2019-08-16T23%3A58%3A18Z&se=2119-07-23T23%3A58%3A18Z'
      },
      transcript: {
        text:
          "WEBVTT\r\n\r\n00:00:01.350 --> 00:00:12.090\r\nHello I'm Christina Hendricks and in this short video I'll be talking about a version of the trolley problem that you deserve as Thompson calls fat man in her article from 1985 called the trolley problem.\r\n\r\n00:00:12.800 --> 00:00:23.210\r\nIntroduces this version of the problem while arguing for how we can differentiate between the cases. She calls bystander at the switch and transplant as discussed in an earlier video in this series.\r\n\r\n00:00:24.770 --> 00:00:34.140\r\nHere's the situation a bystander. Caesar runaway trolley, hurtling down a track. He sees the driver attempt to put on the brakes. The brakes fail in the driver faint.\r\n\r\n00:00:34.860 --> 00:00:48.810\r\nIn Thompson's bystander at the switch example. The bystander can move a lever in switch the trolley onto a side track that will lead to the death of one person instead of 5. Here, there are no side tracks. But the bystanders on a bridge with a very large person in front of him.\r\n\r\n00:00:49.510 --> 00:00:59.920\r\nThe question is, is it morally permissible for the bystander to push the large person onto the tracks, thereby causing the trolley to kill one person instead of letting it go ahead on its path and killing 5.\r\n\r\n00:01:00.950 --> 00:01:11.300\r\nNote that the situation is similar in many respects to bystander at the switch in both cases, the bystander does something to cause the death of one person but thereby avoids the death of 5 others.\r\n\r\n00:01:12.460 --> 00:01:43.460\r\nSeveral polls have shown that many people think, though, that pushing them in onto the tracks is not permissible the first 2 results on the left are from polls in 2006. The one on the right reflects what I saw when I engaged in an interactive case study on philosophy experiments com. They said that if those who had also done the case study 61%, said that it's not permissible to push the large person onto the track note, though, that the yes answer may be higher here because people may do the interactive case study more than once, to see what happens if they answer differently.\r\n\r\n00:01:44.270 --> 00:01:56.150\r\nRemember from an earlier video in this series? How many people said they thought the bystander may flip the switch many people said that it was morally permissible while saying the pushing the large person onto the tracks is not.\r\n\r\n00:01:56.190 --> 00:02:07.150\r\nAlso stipulates in her article that pushing a large man onto the tracks is not morally permissible whereas it would be morally permissible for a bystander to flip a switch to move the trolley onto a track where it will kill one person.\r\n\r\n00:02:08.580 --> 00:02:20.980\r\nBut what is the difference between pulling a lever to switch a track thus leading to the death of one person but avoiding the death of 5, pushing someone onto the tracks. Thus leading to the death of one person but avoiding the death of 5.\r\n\r\n00:02:21.640 --> 00:02:32.920\r\nSee that in the bystander at the switch case. The bystander less directly kills the one person and that they're just pulling a switch whereas in the large person case. The bystanders seems to be more directly killing the person.\r\n\r\n00:02:33.930 --> 00:02:51.780\r\nBut why should it make a moral difference if one pulls a lever versus pushing a person psychologically. It certainly does make a difference. For many people if they are directly touching the person or pulling a lever from further away but should this make a moral difference. When the bystander is the one responsible for the death of the one person in either case.\r\n\r\n00:02:52.800 --> 00:03:04.910\r\nIn her 1985 article called the trolley problem Judith Jarvis Thompson explains the difference between the bystander pulling a lever to switch the trolleys tracks, pushing a large person onto the tracks by reference to write.\r\n\r\n00:03:05.930 --> 00:03:42.760\r\nThompson argues that the action of pulling a lever in the action of pushing a person or importantly different in that one violate someone's rights and the other doesn't. It's important to note here that she's talking about the actual actions of pulling a lever or pushing someone true than in either case. One is killing a person we might want to say that doing so through any action in this situation is a violation of their right to life in her 1985 article. Thompson says it may be possible to argue that either way of killing one person in the trolley problem violates their right to life. But in the case of pulling the lever. This is morally acceptable but not in the case of pushing someone off a bridge.\r\n\r\n00:03:43.770 --> 00:03:53.780\r\nThe differences in the kind of action. One actually performs as Thompson puts it showing a person is infringing a right of his so also is toppling a person of a footbridge.\r\n\r\n00:03:54.390 --> 00:04:04.230\r\nAnd this is the case, she notes even if doing so doesn't result in any injury or death for the person shoved just pushing them off a footbridge in itself violates a rite of theirs.\r\n\r\n00:04:04.990 --> 00:04:37.980\r\nNow, she doesn't go into why this is the case in her article. And it's of courses, disputable but it is possible. I think to say that one has a right that someone else, not intentionally push one off a bridge of courses. This can be overridden in cases where doing so is necessary to save one's life and it's also possible to say as Thompson does pulling a lever to make a trolley switch trucks is not itself an infringement of the right of anybody. The bystander could pull the lever turn the trolley in there be no one on the other truck. The action of pulling the lever and turning the trolley by itself doesn't infringe a right.\r\n\r\n00:04:38.710 --> 00:04:47.400\r\nSo pushing a person violates a right, but pulling a lever does not, and that's why pushing the large person onto the track is not morally permissible, according to Thomson.\r\n\r\n00:04:48.430 --> 00:05:00.760\r\nThat is how in her 1985 article. Thompson differentiated between the trolley problems involving a bystander at the switch pushing a large person off a bridge. The bystander may flip the switch, but not push the person.\r\n\r\n00:05:01.720 --> 00:05:13.950\r\nBut Thompson wrote about the trolley problem again in an article published in 2008 and she changed her mind about whether the bystander is Morley permitted to turn the trolley in the first-place the questions raised by the trolley problem or not yet settled.\r\n",
        file:
          'https://ubcdevmediastorage.blob.core.windows.net/asset-42df03d5-7052-4fcd-a438-9b663948a3af/0e28284c-8e70-4407-b49b-947468e62359_aud_SpReco.vtt?sv=2015-07-08&sr=c&si=976d0fcc-609b-4380-ba99-1e6c3d419170&sig=YMZedXFqyNVSJsuN1Kbb6SPDXrOjWl1qQMPtLnmjEqw%3D&st=2018-07-03T15%3A45%3A55Z&se=2118-06-09T15%3A45%3A55Z'
      },
      thumbnail: {
        url:
          'https://ubcdevmediastorage.blob.core.windows.net/asset-bcf82a9c-143b-49b0-9592-a29628bd2f29/',
        height: 300,
        width: 480,
        sas:
          'sv=2017-04-17&sr=c&si=328384cd-fa71-4545-8ae5-5dc697594e57&sig=YovJn1o1RXjcXUIHsZr2N%2F5eq6XG%2BJbqibA%2BU5km1Zg%3D&st=2019-08-16T23%3A58%3A20Z&se=2119-07-23T23%3A58%3A20Z'
      }
    },
    {
      _id: TEST_UUID.lesson.lesson2,
      name: 'The Trolley Problem 2',
      userId: TEST_UUID.user.teacher2,
      summary: 'Lecture on the famous Trolley Problem',
      status: 4,
      duration: 315.1,
      azure: {
        assetsId: {
          inputAssetId: 'a',
          encodingAssetId: 'b',
          indexAssetId: 'c',
          thumbnailAssetId: 'd',
          offlineAssetId: 'e'
        },
        jobId: 'f'
      },
      video: {
        streaming:
          'https://videxdevmedia-caea.streaming.media.azure.net/691cb183-8e62-4023-bebb-4c4b675ca1a1/7c1fdb17-779c-4327-b186-5037c4e0.ism/manifest(format=m3u8-aapl)',
        download:
          'https://ubcdevmediastorage.blob.core.windows.net/asset-4e1be895-707a-43b5-a35f-d78ece127957/7c1fdb17-779c-4327-b186-5037c4e0.mp4?sv=2017-04-17&sr=c&si=072b2c8b-e205-42e6-a1b4-9362c51bf522&sig=Pu2vBD5AEnCmahhwsMHE23MHBFt1Sw2zURAKWJw7yPg%3D&st=2019-08-16T23%3A58%3A18Z&se=2119-07-23T23%3A58%3A18Z'
      },
      transcript: {
        text:
          "WEBVTT\r\n\r\n00:00:01.350 --> 00:00:12.090\r\nHello I'm Christina Hendricks and in this short video I'll be talking about a version of the trolley problem that you deserve as Thompson calls fat man in her article from 1985 called the trolley problem.\r\n\r\n00:00:12.800 --> 00:00:23.210\r\nIntroduces this version of the problem while arguing for how we can differentiate between the cases. She calls bystander at the switch and transplant as discussed in an earlier video in this series.\r\n\r\n00:00:24.770 --> 00:00:34.140\r\nHere's the situation a bystander. Caesar runaway trolley, hurtling down a track. He sees the driver attempt to put on the brakes. The brakes fail in the driver faint.\r\n\r\n00:00:34.860 --> 00:00:48.810\r\nIn Thompson's bystander at the switch example. The bystander can move a lever in switch the trolley onto a side track that will lead to the death of one person instead of 5. Here, there are no side tracks. But the bystanders on a bridge with a very large person in front of him.\r\n\r\n00:00:49.510 --> 00:00:59.920\r\nThe question is, is it morally permissible for the bystander to push the large person onto the tracks, thereby causing the trolley to kill one person instead of letting it go ahead on its path and killing 5.\r\n\r\n00:01:00.950 --> 00:01:11.300\r\nNote that the situation is similar in many respects to bystander at the switch in both cases, the bystander does something to cause the death of one person but thereby avoids the death of 5 others.\r\n\r\n00:01:12.460 --> 00:01:43.460\r\nSeveral polls have shown that many people think, though, that pushing them in onto the tracks is not permissible the first 2 results on the left are from polls in 2006. The one on the right reflects what I saw when I engaged in an interactive case study on philosophy experiments com. They said that if those who had also done the case study 61%, said that it's not permissible to push the large person onto the track note, though, that the yes answer may be higher here because people may do the interactive case study more than once, to see what happens if they answer differently.\r\n\r\n00:01:44.270 --> 00:01:56.150\r\nRemember from an earlier video in this series? How many people said they thought the bystander may flip the switch many people said that it was morally permissible while saying the pushing the large person onto the tracks is not.\r\n\r\n00:01:56.190 --> 00:02:07.150\r\nAlso stipulates in her article that pushing a large man onto the tracks is not morally permissible whereas it would be morally permissible for a bystander to flip a switch to move the trolley onto a track where it will kill one person.\r\n\r\n00:02:08.580 --> 00:02:20.980\r\nBut what is the difference between pulling a lever to switch a track thus leading to the death of one person but avoiding the death of 5, pushing someone onto the tracks. Thus leading to the death of one person but avoiding the death of 5.\r\n\r\n00:02:21.640 --> 00:02:32.920\r\nSee that in the bystander at the switch case. The bystander less directly kills the one person and that they're just pulling a switch whereas in the large person case. The bystanders seems to be more directly killing the person.\r\n\r\n00:02:33.930 --> 00:02:51.780\r\nBut why should it make a moral difference if one pulls a lever versus pushing a person psychologically. It certainly does make a difference. For many people if they are directly touching the person or pulling a lever from further away but should this make a moral difference. When the bystander is the one responsible for the death of the one person in either case.\r\n\r\n00:02:52.800 --> 00:03:04.910\r\nIn her 1985 article called the trolley problem Judith Jarvis Thompson explains the difference between the bystander pulling a lever to switch the trolleys tracks, pushing a large person onto the tracks by reference to write.\r\n\r\n00:03:05.930 --> 00:03:42.760\r\nThompson argues that the action of pulling a lever in the action of pushing a person or importantly different in that one violate someone's rights and the other doesn't. It's important to note here that she's talking about the actual actions of pulling a lever or pushing someone true than in either case. One is killing a person we might want to say that doing so through any action in this situation is a violation of their right to life in her 1985 article. Thompson says it may be possible to argue that either way of killing one person in the trolley problem violates their right to life. But in the case of pulling the lever. This is morally acceptable but not in the case of pushing someone off a bridge.\r\n\r\n00:03:43.770 --> 00:03:53.780\r\nThe differences in the kind of action. One actually performs as Thompson puts it showing a person is infringing a right of his so also is toppling a person of a footbridge.\r\n\r\n00:03:54.390 --> 00:04:04.230\r\nAnd this is the case, she notes even if doing so doesn't result in any injury or death for the person shoved just pushing them off a footbridge in itself violates a rite of theirs.\r\n\r\n00:04:04.990 --> 00:04:37.980\r\nNow, she doesn't go into why this is the case in her article. And it's of courses, disputable but it is possible. I think to say that one has a right that someone else, not intentionally push one off a bridge of courses. This can be overridden in cases where doing so is necessary to save one's life and it's also possible to say as Thompson does pulling a lever to make a trolley switch trucks is not itself an infringement of the right of anybody. The bystander could pull the lever turn the trolley in there be no one on the other truck. The action of pulling the lever and turning the trolley by itself doesn't infringe a right.\r\n\r\n00:04:38.710 --> 00:04:47.400\r\nSo pushing a person violates a right, but pulling a lever does not, and that's why pushing the large person onto the track is not morally permissible, according to Thomson.\r\n\r\n00:04:48.430 --> 00:05:00.760\r\nThat is how in her 1985 article. Thompson differentiated between the trolley problems involving a bystander at the switch pushing a large person off a bridge. The bystander may flip the switch, but not push the person.\r\n\r\n00:05:01.720 --> 00:05:13.950\r\nBut Thompson wrote about the trolley problem again in an article published in 2008 and she changed her mind about whether the bystander is Morley permitted to turn the trolley in the first-place the questions raised by the trolley problem or not yet settled.\r\n",
        file:
          'https://ubcdevmediastorage.blob.core.windows.net/asset-b11a479b-c25c-4aae-9897-1d86d22dc2c5/7c1fdb17-779c-4327-b186-5037c4e01734_aud_SpReco.vtt?sv=2017-04-17&sr=c&si=f0fef66e-22aa-4a48-a77c-56830b5389a2&sig=CX%2B6uUb%2BJW6WkaqMtM16kDzt9RykQuW0TqZq3oGiQ6Q%3D&st=2019-08-16T23%3A58%3A19Z&se=2119-07-23T23%3A58%3A19Z'
      },
      thumbnail: {
        url:
          'https://ubcdevmediastorage.blob.core.windows.net/asset-bcf82a9c-143b-49b0-9592-a29628bd2f29/',
        height: 300,
        width: 480,
        sas:
          'sv=2017-04-17&sr=c&si=328384cd-fa71-4545-8ae5-5dc697594e57&sig=YovJn1o1RXjcXUIHsZr2N%2F5eq6XG%2BJbqibA%2BU5km1Zg%3D&st=2019-08-16T23%3A58%3A20Z&se=2119-07-23T23%3A58%3A20Z'
      }
    }
  ],
  Subject: [
    {
      _id: 'e7e61aa5fd0a7c8001541d4238f92e3ac57941cabb7171f80df2be6545a8d3fd',
      courseId: TEST_UUID.course.course1,
      lessonId: TEST_UUID.lesson.lesson1,
      releaseDate: new Date(2017, 8, 2),
      publish: true,
      category: 'default',
      keywords: []
    },
    {
      _id: '5235b0cbcb3ccc097421f70e3268461f5b4d589d920a7986e67b981d389dc9c8',
      courseId: TEST_UUID.course.course2,
      lessonId: TEST_UUID.lesson.lesson2,
      releaseDate: new Date(2017, 9, 2),
      publish: false,
      category: 'default',
      keywords: []
    }
  ],
  Annotation: [
    {
      _id: TEST_UUID.annotation.annotation1,
      userId: TEST_UUID.user.student1,
      lessonId: TEST_UUID.lesson.lesson1,
      color: 'green',
      text: 'boring',
      start: 0,
      end: 10,
      share: false,
      editedAt: new Date(2017, 8, 2)
    },
    {
      _id: TEST_UUID.annotation.annotation2,
      userId: TEST_UUID.user.teacher1,
      lessonId: TEST_UUID.lesson.lesson1,
      color: 'blue',
      text: 'important',
      start: 10,
      end: 20,
      share: true,
      editedAt: new Date(2017, 8, 2)
    }
  ]
};
