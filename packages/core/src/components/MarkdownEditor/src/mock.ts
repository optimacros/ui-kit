import { faker } from '@faker-js/faker';

export const defaultValue = `# Optional motivating process improvement

## About the Author
*Hubert Fritsch*
Regional Markets Associate at Romaguera - Kuhic

## Introduction
Necessitatibus delinquo tutis agnitio tandem corpus caterva cultura. Cogito cauda amissio totam usitas undique. Auctus denuncio solitudo cursim.

### Key Points
- orchestrate transparent infrastructures
- productize cutting-edge large language models
- harness killer functionalities

## Main Content

### Electronic Frozen Shoes
Viriliter perspiciatis cometes patior adversus tracto cinis reprehenderit. Sustineo velum textor cogito tabgo adnuo. Volva allatus consectetur.
Sub deprecator stips. Civis stipes vix adfectus triumphus deorsum odit. Triduana ventito aestivus debilito vulgaris culpa.

#### Technical Details
| Feature | Description |
|---------|-------------|
| adfero | turba |
| expedita | voluptatibus |
| accusator | turbo |
| vinculum | thymum |

### Market Analysis
Modi patrocinor despecto argentum conor numquam super ipsam cruentus ullam. Vallum suppellex vomito pariatur consequatur ventito. Ater surgo condico conturbo est curo clamo apparatus.

> detective advocate, activist
> — Weldon Bergstrom

## Conclusion
Suus creber campana adfectus derelinquo. Tamquam urbs valetudo absens consequuntur villa carmen blanditiis.

---
*Generated on 25.02.2025*
Tags: redundant, wireless, auxiliary
`;

export const generateMarkdown = () => {
    return `# ${faker.company.catchPhrase()}

## About the Author
*${faker.person.fullName()}*
${faker.person.jobTitle()} at ${faker.company.name()}

## Introduction
${faker.lorem.paragraph(3)}

### Key Points
${new Array(3)
    .fill(null)
    .map(() => `- ${faker.company.buzzPhrase()}`)
    .join('\n')}

## Main Content

### ${faker.commerce.productName()}
${faker.lorem.paragraphs(2)}

#### Technical Details
| Feature | Description |
|---------|-------------|
${new Array(4)
    .fill(null)
    .map(() => `| ${faker.lorem.word()} | ${faker.lorem.word()} |`)
    .join('\n')}

### Market Analysis
${faker.lorem.paragraphs(1)}

> ${faker.person.bio()}
> — ${faker.person.firstName()} ${faker.person.lastName()}

## Conclusion
${faker.lorem.paragraph(2)}

---
*Generated on ${faker.date.recent().toLocaleDateString()}*
Tags: ${new Array(3)
        .fill(null)
        .map(() => `${faker.hacker.adjective()}`)
        .join(', ')}
`;
};
