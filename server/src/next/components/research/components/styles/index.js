import css from 'styled-jsx/css';

export const cover = css`
  .title {
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    padding-left: 20px;
  }

  .demo-button {
    margin-left: 50%;
    width: 100px;
    border-radius: 0;
  }

  @media all and (min-width: 1000px) {
    h1,
    h2 {
      font-size: 1.6em;
    }
  }
  @media all and (min-width: 1100px) {
    h1,
    h2 {
      font-size: 1.8em;
    }
  }
  @media all and (min-width: 1200px) {
    h1,
    h2 {
      font-size: 2em;
    }
  }
  @media all and (min-width: 1300px) {
    h1,
    h2 {
      font-size: 2.2em;
    }
  }
  @media all and (min-width: 1400px) {
    h1,
    h2 {
      font-size: 2.4em;
    }
  }
`;

export const researchCard = css`
  .researchCard {
    display: grid !important;
    grid-template-columns: auto auto auto;
    height: 60vh;
    grid-gap: 10px;
    background-color: #fff !important;
  }
`;

export const researchCarouselItem = css`
  .research-carousel-item {
    display: flex !important;
    align-items: center !important;
    padding: 15px;
    height: 60vh !important;
  }

  .research-carousel-item img {
    max-width: 100%;
    max-height: 100%;
  }

  .research-carousel-item table {
    width: 100%;
    text-align: left;
    margin-left: 15%;
  }
`;

export const collaborate = css`
  .collaborateTitle {
    margin-top: 25%;
    margin-left: 10%;
  }

  .collaborateDescription {
    margin-top: 15%;
    margin-left: 10%;
  }

  @media all and (min-width: 300px) {
    h1 {
      font-size: 1.6em;
    }
  }
  @media all and (min-width: 800px) {
    h1 {
      font-size: 2em;
    }
  }
  @media all and (min-width: 900px) {
    h1 {
      font-size: 2.5em;
    }
  }
`;

export const authorCard = css`
  .name {
    white-space: normal !important;
    font-size: 1em;
  }
`;

export const demoButton = css`
  @media all and (max-width: 900px) {
    .demo-button {
      font-size: 0.5em;
    }
  }
`;
