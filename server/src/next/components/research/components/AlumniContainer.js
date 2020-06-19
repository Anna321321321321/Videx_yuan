import { Grid } from 'semantic-ui-react';
import React, { Component, Fragment } from 'react';
import AuthorCard from './AuthorCard';

export default class AlummiContainer extends Component {
  render() {
    return (
      <Fragment>
        <Grid stackable={true} relaxed={true} columns={4} padded>
          <Grid.Row>
            <Grid.Column>
              <AuthorCard
                imageSrc="/static/profile-pics/junyuan.jpg"
                name="Junyuan Zheng"
                title="Software Engineer"
                description="I am currently a full-time full stack developer at the University of British Columbia, in Vancouver, BC. Previous positions include Software Engineering internships with Garmin International, Inc. in Cochrane, AB and Wavefront Dencare Project in Vancouver, BC. 
                Earlier I worked as an Undergraduate Research Assistant at Beijing Jiaotong University in Beijing, China. My exceptional work ethic is supported by sound technical aptitude and strong business values. 
                I grasp new concepts with ease and am analytical in my approach to developing workable solutions to software design challenges."
                contact="joseph.zjy@gmail.com."
              />
            </Grid.Column>
            <Grid.Column>
              <AuthorCard
                imageSrc="/static/profile-pics/rui.jpg"
                name="Rui Yang"
                title="MASc Student"
                description="Rui is an M.A.Sc.student in the department of Electrical and Computer 
                Engineering and a research assistant in the Human Communication 
                Technologies lab at UBC. Her research interests mainly lie in Human 
                Computer Interaction, UI/UX design, and information visualization."
                contact="rui@ece.ubc.ca"
              />
            </Grid.Column>
            <Grid.Column>
              <AuthorCard
                imageSrc="/static/profile-pics/laila.jpg"
                name="Laila Malatawy"
                title="Visiting Researcher"
                description="Laila is a visiting researcher who is leading the design on the ViDeX mobile app."
                contact="laila.malatawy@gmail.com"
              />
            </Grid.Column>
            <Grid.Column>
              <AuthorCard
                imageSrc="/static/profile-pics/sameer.jpg"
                name="Sameer Sunani"
                title="Software Engineer"
                description=" 
                Sameer has been working as a Front-End Developer at the Human Computer Interaction Lab in the University of British Columbia since 2017. Previously, he worked as a Web Application Developer at 
                Hatfield Consultants, Vancouver. He enjoys creating dynamic web applications and coming up with creative solutions to complicated problems."
                contact="sam_sunani@outlook.com"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <AuthorCard
                imageSrc="/static/profile-pics/matin.jpg"
                name="Matin Yarmand"
                title="HCI Researcher"
                description="Matin is a fourth year Undergraduate student at UBC, completing his major in Computer Science and minor in Commerce. 
                His research interest is on multimodal interaction design and online communication."
                contact="matin.yarmand@alumni.ubc.ca"
              />
            </Grid.Column>
            <Grid.Column>
              <AuthorCard
                imageSrc="/static/profile-pics/min.jpg"
                name="Min Li"
                title="MASc Student"
                description="Min Li is a MASc student in Electrical and Computer Engineering Department at the UBC. 
                Her research investigates how to manage annotations made on videos to support students’ learning."
                contact="minli@ece.ubc.ca"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Fragment>
    );
  }
}
