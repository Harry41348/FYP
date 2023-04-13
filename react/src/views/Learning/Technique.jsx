import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Technique() {
  const accordions = [
    {
      accordion: "Stirring",
      typography: (
        <>
          Stirring is used when cocktails are made of spirits and liqueurs. The
          ingredients are poured into a glass or mixing glass with some ice and
          stirred using a bar spoons. This helps prevent the ice diluting the
          drink, whilst keeping it chilled and combining the alcohols together.
        </>
      ),
    },
    {
      accordion: "Shaking",
      typography: (
        <>
          A very common technique in making cocktails. The ingredients are
          placed into a shaker (usually filled with ice) and thoroughly shaken
          until the ingredients have mixed and chilled. This method is most
          often used for drinks with fruit juices, egg, or cream and then
          strained for a smooth drink, that is sometimes frothy depending on the
          ingredients.
        </>
      ),
    },
    {
      accordion: "Blending",
      typography: (
        <>
          Blending is useful when a drink has solid foods in it, such as fruits,
          which when blended provide a smooth drink. Adding ice to the blending
          can also give a slushy texture. This is also an easy way to make
          multiple drinks in one. One of the more popular drinks for blending is
          the Strawberry Daquiri.
        </>
      ),
    },
    {
      accordion: "Layering",
      typography: (
        <>
          This technique gives drinks an elegant look, with different colours
          being layered on top of one another. To stop the liquids from merging,
          this method requires drinks to be poured over the back of a spoon into
          a glass. Another way to do this is to pour drinks over the twisted
          part of a bar spoon.
          <br />
          Theory: The drinks are poured in order of their specific gravity. The
          heaviest drinks at the bottom, the lightest on top. It is hard to know
          the exact density of each ingredient, however the more sugar an
          ingredient has, the heavier it will be. Syrups are generally the
          heaviest ingredient. Alcohol is generally light, making liqueurs
          lighter than syrups, and spirits as the lightest ingredient. The
          higher the proof, the lighter it is.
        </>
      ),
    },
    {
      accordion: "Building",
      typography: (
        <>
          This is a basic technique that is done straight into the glass, by
          pouring the ingredients one at a time over ice and giving them a
          simple stir.
        </>
      ),
    },
  ];

  return (
    <>
      {accordions.map((accordion) => (
        <Accordion key={accordion.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{accordion.accordion}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{accordion.typography}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}

export default Technique;
