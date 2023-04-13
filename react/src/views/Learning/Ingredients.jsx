import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

function Ingredients() {
  const accordions = [
    {
      accordion: "Alcohol",
      typography: (
        <>
          Alcohol is the base for all cocktails (without alcohol it would be a
          mocktail) and is usually either a spirit or a liqueur. The difference
          is that a spirit is made from a grain or a fruit or vegetable sugar
          which is fermented and distilled, whereas a liqueur is generally
          sweeter and flavoured and is made from a liquor.
          <br />A good tasting spirit/liqueur is important, but it is a good
          idea to not get anything too expensive as most cocktails have many
          flavours and this would cover up the complexities of the alcohol. Some
          great ingredients to start off with include: vodka, gin, tequila,
          light rum, dark rum and whisk(e)y. Over time, other spirits and
          liqueurs can be bought to create a variety of cocktails. A more
          extensive list can be found in the ingredient section of{" "}
          <Link to="/my-bar">your bar</Link>.
        </>
      ),
    },
    {
      accordion: "Mixers",
      typography: (
        <>
          Mixers give drinks their great and unique flavours whilst reducing the
          strong flavour of the alcohol. There is an abundance of mixers out
          there, with the main ones including different juices, citrus, fruits,
          syrups, and other liquids. Some great mixers to have stocked up
          include: Ginger beer/ale, soda water, lemonade, cola and sugar syrup.
          Things like juices and fruits can be bought when needed, but having
          these other ingredients gives a great base to build from for many
          cocktails.
        </>
      ),
    },
    {
      accordion: "Garnishes",
      typography: (
        <>
          Though these are not essential, they can give cocktails a boost in
          aesthetics, and can help with the flavour in some cases. Some good to
          have garnishes include: Limes, lemons, oranges, maraschino cherries,
          salt, sugar cubes and green olives.
        </>
      ),
    },
    {
      accordion: "Ice",
      typography: (
        <>
          Ice is essential and easily overlooked. You can do every step right in
          making a cocktail, but without ice the drink will often become
          undrinkable. Shop bought ice works well for taste and mixing, but ice
          moulds can make them much more aesthetic and are cheaper to make.
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

export default Ingredients;
