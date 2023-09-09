import React from 'react';
import {
  ButtonBack, ButtonFirst, ButtonLast, ButtonNext, CarouselProvider, Slide, Slider,
} from 'pure-react-carousel';


const Instructions = () => {
  return (
    <CarouselProvider
      visibleSlides={1}
      totalSlides={4}
      step={1}
      naturalSlideWidth={400}
      naturalSlideHeight={500}
      isIntrinsicHeight
    >
      <h2 className={''}>With intrinsic axis dimension</h2>
      <ButtonFirst>First</ButtonFirst>
      <ButtonBack>Back</ButtonBack>
      <ButtonNext>Next</ButtonNext>
      <ButtonLast>Last</ButtonLast>
      <p />
      <Slider className={''}>
        <Slide index={0}>
          <h1>Slider 1</h1>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
            sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
            elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
            sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
            kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </p>
        </Slide>
        <Slide index={1}>
          <h1>Slider 2</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi tenetur sed ea praesentium enim dolor mollitia sit est at libero aliquam minus dolorum veniam, eligendi molestias consequatur sunt velit? Ut.
            Ullam animi, aliquid provident cupiditate debitis velit fugiat ipsam consequatur nemo nulla rerum? Ipsa fuga minima blanditiis. Neque accusantium voluptatum aliquam consequatur qui distinctio impedit, totam nulla voluptate alias tenetur!
            Facilis ratione praesentium consectetur laborum harum totam quia culpa deleniti perspiciatis labore repudiandae consequatur fuga, veritatis natus magni! Alias iusto eum harum deserunt distinctio? Obcaecati iste dolores voluptatibus repellat voluptates.
          </p>
        </Slide>
        <Slide index={2}>
          <h1>Slider 3</h1>
          <p>
            lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. at vero eos et
            accusam et justo duo dolores et ea rebum. stet clita kasd gubergren, no sea takimata
            sanctus est lorem ipsum dolor sit amet. lorem ipsum dolor sit amet, consetetur sadipscing
            elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
            sed diam voluptua. at vero eos et accusam et justo duo dolores et ea rebum. stet clita
            kasd gubergren, no sea takimata sanctus est lorem ipsum dolor sit amet.
          </p>
        </Slide>
        <Slide index={3}>
          <h1>Slider 4</h1>
          <p>
            Reprehenderit blanditiis harum beatae necessitatibus reiciendis quaerat corrupti.  
            mollitia quia earum nihil a, aut sit nostrum! Corrupti id ab officia? at vero eos et
            accusam et justo duo dolores et ea rebum. stet clita kasd gubergren, no sea takimata
            sanctus est lorem ipsum dolor sit amet. lorem ipsum dolor sit amet, consetetur sadipscing
            elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
            sed diam voluptua. at vero eos et accusam et justo duo dolores et ea rebum. stet clita
            kasd gubergren, no sea takimata sanctus est lorem ipsum dolor sit amet.
          </p>
        </Slide>
      </Slider>
      {/* <ButtonFirst>First</ButtonFirst>
    <ButtonBack>Back</ButtonBack>
    <ButtonNext>Next</ButtonNext>
    <ButtonLast>Last</ButtonLast> */}
    </CarouselProvider>
  );
};

export default Instructions;
