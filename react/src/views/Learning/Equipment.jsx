import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Equipment() {
  const accordions = [
    {
      accordion: "Shakers",
      typography:
        "These are a core tool for creating cocktails. Shakers are used to mix ingredients together thoroughly, usually when the drink has mixers in.",
    },
    {
      accordion: "Strainers",
      typography:
        "These are useful for making cocktails smooth, by catching pulp and ice.",
    },
    {
      accordion: "Jiggers",
      typography:
        "A tool used for measuring liquid ounces quickly. The most common one is to have a double-sided jigger for measure 1 and 2 ounces, ideal for most cocktails.",
    },
    {
      accordion: "Bar Spoons",
      typography:
        "These are different from regular spoons, with a longer range to mix drinks from the bottom to the top, along with a twisted middle part to allow the user to mix with ease once they get the hang of it.",
    },
    {
      accordion: "Bar Glasses",
      typography:
        "Bar glasses are essential for containing the drink made. Starting out, any regular glass can be used, but specific drinks are intended for certain glasses and can have a big impact of aesthetics. Examples include martini glasses for martinis, highball for long island iced teas, and rock glasses for an old fashioned. ",
    },
    {
      accordion: "Garnishing Tools",
      typography:
        "Garnishes help to make cocktails more aesthetically pleasing. There are many tools intended for garnishing such as a paring knife, zester, peeler, toothpicks, clothespins, and more. ",
    },
    {
      accordion: "Additional Tools",
      typography:
        "There are many tools that are not used every day by mixologists but can be useful in specific use cases. Some include blenders, ice makers, funnels, absinthe spoon, citrus squeezer, and many more.",
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

export default Equipment;
