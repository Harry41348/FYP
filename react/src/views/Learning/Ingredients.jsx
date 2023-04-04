import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Ingredients() {
  const accordions = [
    {
      accordion: "Alcohol",
      typography:
        "This is the base for all cocktails, whilst a good tasting spirit/liqueur is important, it is a good idea to not get anything too expensive as most cocktails have many flavours and will waste the taste of the spirit. The base alcoholic ingredients to stock for a home bar are: vodka, gin, tequila, rum, whisk(e)y, and brandy. Over time, other spirits and liqueurs can be bought to create a variety of cocktails.",
    },
    {
      accordion: "Mixers",
      typography:
        "Mixers done well give drinks their great flavours and mask the flavour of the alcohol in many drinks. The main mixers are juices, citrus and fruits, syrups, and other liquids. The essentials include: Tonic water, ginger beer, club soda, lemonade, cola, lemons and limes, and sugar syrup.",
    },
    {
      accordion: "Garnishes",
      typography:
        "Though these are not essential, they can give cocktails a boost in aesthetics, and some can help with the flavour. Some good to have garnishes include: Limes, lemons, oranges, maraschino cherries, salt, sugar cubes, and green olives.",
    },
    {
      accordion: "Ice",
      typography:
        "Ice is another essential ingredient, one that is easy to overlook. Without ice, a perfect cocktail can become undrinkable. Shop bought ice works well for taste, but ice moulds can make them much more aesthetic.",
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

export default Ingredients;
