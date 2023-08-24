import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className='footer-content'>
        <div className='footler-content-title'>
          <div>ADOFAI.gg</div>

          <div className='footler-content-disclaimer'>
            ADOFAI.GG is not associated with{' '}
            <a href='https://7thbe.at/' target='_blank' rel='noreferrer'>
              7th Beat Games
            </a>
          </div>
        </div>

        <div className='footer-content-links'>
          <div>
            <a
              href='https://discord.gg/TKdpbUUfUa'
              target='_blank'
              rel='noreferrer'
            >
              Join ADOFAI.gg Community Discord
            </a>
          </div>

          <div>
            <a href='mailto:adofai.gg@gmail.com'>Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
