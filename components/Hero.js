import React from 'react'
import { css, cx } from '@emotion/css'
import styled from '@emotion/styled'
import 'bootstrap/dist/css/bootstrap.min.css'



const Hero = () => {
  const color = 'white';

  const Button = styled.button`
  padding: 32px;
  background-color: hotpink;
  font-size: 24px;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  &:hover {
    color: white;
  }
`

  const Container = styled.div`
  background-color: #F3F4ED;
  padding: 20px;
  color: black;
  font-family: Helvetica;
  `


  return (
    <>
<Container>
    <div className="row">
      <div className="col-lg-6">
        <div className={css`font-size: 50px; letter-spacing:-2px; font-weight: bolder;`}>©NEU DEPARTMENT 2022 <br /> SPRING/<span className={css`font-family: "Times New Roman"; letter-spacing: -4px; font-weight: lighter; font-style: italic;`}>SUMMER</span> VOL. 7</div>
        <div className={css`position: relative; width: 100%;  border: 2px solid #000; height: 80px; border-radius: 50% / 40px; margin: 20px 0px; 20px 0px;`}>
          <div className='position-absolute top-50 start-50 translate-middle'>Go to content</div>
        </div>
          <div className="row">
            <div className="col">
              <div className={css`height: 200px; width: 100%; background-color: #ff4500; border-radius: 10px; padding: 10px`}>lorem</div>
            </div>
            <div className="col">
              <div className={css`height: 200px; width: 100%; overflow: hidden;`}>
              TAGS: EVENTS
                </div>
            </div>
          </div>
      </div>
      <div className="col-lg-6">
          <div className={css`margin-top: 13px`}>Description</div>
          <p className={css`font-decoration: underline`}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt, iure molestiae nulla iusto fuga obcaecati aut vitae recusandae est ut accusantium. Sapiente consectetur provident animi quis velit, minus hic aut ducimus blanditiis nemo! Vitae consequuntur quo magni, necessitatibus, iure quia inventore molestias, officia mollitia nihil quibusdam enim officiis eaque quidem!</p>
          <div>Collaborations</div>
          <img src="" alt="" />
          <div className="row">
            <div className="col-lg-6">
              <div className={css`position: relative; height: 200px; background-color: blue; overflow: hidden;`}>
                <img className={css`width: 100%; transform: translateY(-10%);`} src="https://i.ibb.co/3WypD1w/nice.jpg" alt="" />
                <div className='position-absolute top-50 start-50 translate-middle'>
                  <div className={css`color: white; font-size: 50px; font-weight: bolder;`}>タカシ</div>
                </div>
              </div>
              </div>
              <div className="col-lg-6">
              <div className={css`position: relative; height: 200px; background-color: blue; overflow: hidden;`}>
                <img className={css`width: 100%; transform: translateY(-40%);`} src="https://images.unsplash.com/photo-1562615992-6289cfc36f2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="" />
                <div className='position-absolute top-50 start-50 translate-middle'>
                  <div className={css`color: white; font-size: 50px; font-weight: bolder;`}>HYSTERIA</div>
                </div>
              </div>
              </div>
          </div>
      </div>
    </div>
    </Container>
  <Button>Submit</Button>
 

  

  </>
  )
}

export default Hero