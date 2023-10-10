import {
    Container,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Text

} from "@chakra-ui/react";
import { m_NormalTextColor, m_SectionHeadingColor } from "../Constants";

const actors = [
    {
        "title": "I am a server provider",
        "description": "Server Providers are the backbone of the Aristotle AI ecosystem, offering their computational resources for AI model training. By listing your available CPU, GPU, and RAM resources, you enable a decentralized, transparent, and efficient environment for AI training.",
        "steps": ["Step 1: Connect your wallet", "Step 2: Go to the Provide Servers screen", "Step 3: Fill in your server specifications and availability and list your server", "Step 4: Get rewarded on successfull completion of AI/ML training jobs"]
    },
    {
        "title": "I am an AI / ML Scientist",
        "description": "On Aristotle AI, you can securely submit models and training data, specify resource requirements, and get matched with suitable Server Providers. The transparent pricing and smart contract automation ensure a trustworthy and hassle-free experience as you advance your AI projects.",
        "steps": ["Step 1: Connect your wallet", "Step 2: Go to the Use Servers section", "Step 3: Fill in your server requirements", "Step 4: An optimal server will be assigned to you alongwith the provider's Public Key", "Step 5: Submit the data and model, it will be encrypted with the Public Key, stored on Arweave and the job will be assigned to the server on transfer your funds", "Step 6: Verify the job once it is marked completed!"]
    }
]

export default function Actors() {
    return (
      <Container maxW={"5xl"} p={2} pt={{base: 16, sm: 16}} pb={{ base: 10, sm: 20 }} textAlign={"left"}>
        <Tabs variant="enclosed" borderBottom={"1px"} borderColor={m_NormalTextColor}>
        <TabList>
            {actors.map((actor) => (
                <Tab border={"1px"} color={m_NormalTextColor} px={{base: 5, sm: 20}} fontSize={{ base: "xl", sm: "xl", md: "xl" }} fontWeight={"semibold"} _selected={{ color: 'black', bg: m_SectionHeadingColor}}>
                    <h3>{actor.title}</h3>
                </Tab>
            ))}
        </TabList>

        <TabPanels py={5}>
            {actors.map((actor) => (
                <TabPanel color={m_NormalTextColor}>
                    <p>
                        {actor.description}
                        <br/><br/>
                        {actor.steps.map((step) => (
                            <Text color={m_NormalTextColor}>{step}</Text>
                        ))}
                    </p>
                </TabPanel>
            ))}
        </TabPanels>
        </Tabs>
      </Container>
    );
  }
  