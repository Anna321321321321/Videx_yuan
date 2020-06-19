import React, { Component } from 'react';
import { h1, li, ul } from './styles';

export default class Terms extends Component {
  CONSENT_TEXT_1 =
    'Collection of Data. The application may collect information about you and your use of the application and send that to Microsoft, or the data may be collected and later given to Microsoft. The data may be processed in the United States. Microsoft may use this information to provide and improve the application, including commercial versions of the application which Microsoft develops and distributes to customers. There are no opt-outs for this data collection, so if you do not consent to the collection of your data you should not use the application.';

  CONSENT_TEXT_2 =
    'DISCLAIMER OF WARRANTY. THE SOFTWARE AND SERVICE ARE LICENSED “AS IS.” YOU BEAR THE RISK OF USING THEM. MICROSOFT GIVES NO EXPRESS WARRANTIES, GUARANTEES, OR CONDITIONS. TO THE EXTENT PERMITTED UNDER APPLICABLE LAWS, MICROSOFT EXCLUDES ALL IMPLIED WARRANTIES, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.';

  CONSENT_TEXT_3 = [
    'LIMITATION ON AND EXCLUSION OF DAMAGES. IF YOU HAVE ANY BASIS FOR RECOVERING DAMAGES DESPITE THE PRECEDING DISCLAIMER OF WARRANTY, YOU CAN RECOVER FROM MICROSOFT AND ITS SUPPLIERS ONLY DIRECT DAMAGES UP TO U.S. $5.00. YOU CANNOT RECOVER ANY OTHER DAMAGES, INCLUDING CONSEQUENTIAL, LOST PROFITS, SPECIAL, INDIRECT OR INCIDENTAL DAMAGES.',
    'This limitation applies to (a) anything related to the software, services, content (including code) on third party Internet sites, or third party applications; and (b) claims for breach of contract, warranty, guarantee, or condition; strict liability, negligence, or other tort; or any other claim; in each case to the extent permitted by applicable law.',
    'It also applies even if Microsoft knew or should have known about the possibility of the damages. The above limitation or exclusion may not apply to you because your state, province, or country may not allow the exclusion or limitation of incidental, consequential, or other damages.'
  ];

  render() {
    return (
      <div>
        <style jsx>{h1}</style>
        <h1>Terms of Use</h1>
        <style jsx>{li}</style>
        <style jsx>{ul}</style>
        <ul>
          <li>{this.CONSENT_TEXT_1}</li>
          <li>{this.CONSENT_TEXT_2}</li>
          <ul>
            <li>{this.CONSENT_TEXT_3[0]}</li>
            <li>{this.CONSENT_TEXT_3[1]}</li>
            <li>{this.CONSENT_TEXT_3[2]}</li>
          </ul>
        </ul>
      </div>
    );
  }
}
