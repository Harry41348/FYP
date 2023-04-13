import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Equipment() {
  const accordions = [
    {
      accordion: "Cocktail Shakers",
      typography: (
        <>
          Shakers are a tool used for mixing ingredients together thoroughly,
          whilst chilling them at the same time. Drinks are chilled faster with
          this method than stirring, due to the drinks repeatedly being exposed
          to the ice at a faster rate. With this tool, you want to use ice cubes
          or chunks, rather than smaller fragments of ice. This prevents
          cocktails being over-diluted with water. The chunks of ice will still
          dilute, giving the cocktail a smoother taste by mellowing out the
          harsher tastes.
          <br /> There are a few types of shakers, the most popular in
          bartending is the Boston shaker, which has a larger volume allowing
          for multiple cocktails to be made at once. Another is the cobbler,
          which is a 3-piece shaker, with a built-in strainer. And lastly is the
          French/Parisian shaker which is a similar shape to the cobbler without
          the built in strainer.
        </>
      ),
    },
    {
      accordion: "Strainers",
      typography: (
        <>
          There are a few types of strainers used for making cocktails. The most
          common are the Hawthorne and the fine mesh strainer. These are
          excellent for filtering out pulp and ice, making for a smoother drink.
          Other than the built in strainer in the cobbler shaker, there is also
          the julep strainer, a bowl-shaped strainer which used to be used for
          drinking mint juleps, but also works for filtering out pulp and ice.
        </>
      ),
    },
    {
      accordion: "Jiggers",
      typography: (
        <>
          A jigger is 1.5 ounces. This tool was named after this measurement and
          consists of two sides measuring typically 1 ounce and 1.5 ounces, but
          can range from half an ounce to 2.5 ounces. They allow bartenders to
          rapidly pour accurate measures of ingredients.
        </>
      ),
    },
    {
      accordion: "Bar Spoons",
      typography: (
        <p>
          Bar spoons are longer, twisted spoons used for stirring drinks. There
          are a few variations, but they all perform the same function. It makes
          stirring easy once you get the technique down and helps reach the
          bottom of the glass to ensure the drink is mixed all the way through.
          To stir with it, you hold it between your thumb, middle and ring
          finger like a pencil, and stir it along the outside of the glass.
          <br /> Fun fact: The bar spoon can be used to layer drinks by pouring
          onto the twisted part of the spoon and watch as the liquid swirls
          down. This is a great way to impress guests rather than pouring onto
          the back of a spoon.
        </p>
      ),
    },
    {
      accordion: "Bar Glasses",
      typography: (
        <>
          Of course, a vital piece of equipment to have is the glass to drink
          out of. There is a wide variety of glasses, and most drinks have a
          specific glass it is intended for. Drinks will taste the same no
          matter the glass, but you want drinks to be aesthetically pleasing to
          impress your drinkers. The highball, rocks and coupe/martini glasses
          are some great ones to start with. There are many glasses out there,
          but a few other popular ones include: The collins glass, copper mug,
          margarita glass, hurricane glass and the wine glass.
        </>
      ),
    },
    {
      accordion: "Garnishing Tools",
      typography: (
        <>
          Garnishes help to make cocktails more aesthetically pleasing. There
          are many tools intended for garnishing such as a paring knife, zester,
          peeler, toothpicks, clothespins, and more. At home, garnishing can
          seem pointless and a waste, but it really does elevate drinks to
          another level and will impress guests/customers.
        </>
      ),
    },
    {
      accordion: "Additional Tools",
      typography: (
        <>
          There are many tools that are not used every day by mixologists but
          are useful in specific use cases. Some include blenders, ice makers,
          funnels, absinthe spoon, citrus squeezer, and there are many more
          which can be discovered through finding recipes.
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

export default Equipment;
