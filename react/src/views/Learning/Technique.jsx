import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Technique() {
  const accordions = [
    {
      accordion: "Stirring",
      typography:
        "This method is most used when cocktails are made of spirits and liqueurs. The Technique are put into a glass/mixing glass with some ice and stirred using a bar spoons. This helps prevent the ice diluting the drink.",
    },
    {
      accordion: "Shaking",
      typography:
        "When you think of cocktail making, you likely think of shaking. This is when ingredients are placed into a shaker, and thoroughly shaken until the ingredients have mixed, and are cold from the ice. This method is most used for drinks with fruit juices, egg, or cream.",
    },
    {
      accordion: "Blending",
      typography:
        "Blending is useful when a drink has solid foods in it, such as strawberries, which when blended provide a smooth drink. Adding ice to the blending can also give a slushy texture. This is also an easy way to make multiple drinks in one.",
    },
    {
      accordion: "Layering",
      typography:
        "This technique gives drinks an elegant look, with different colours being layered on top of one another. To stop the liquids from merging, this method requires drinks to be poured over the back of a spoon into a glass. There is a bit of theory that goes into this technique.",
    },
    {
      accordion: "Building",
      typography:
        "This is a basic technique that can be done straight into the glass, by putting in the ingredients one at a time over ice and giving them a simple stir.",
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
