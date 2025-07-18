feats = [
    {
        name: "Crossing Niagara",
        index: 6,
        description: "You and your other team member must each sit at tables spaced 5 meters apart. One team member starts with 6 meters of yarn, and a drone, the other starts with a laptop. The team member with the yarn must find a way to get one end of it to their partner, without stepping in the deadly waters of the 5 meter gap. You cannot remotely control your drone for this challenge.",
    },
    {
        name: "Cerberus",
        index: 7,
        description: "Create a drone guard dog. The drone should use its front sensor to watch for anyone crossing a given threshold. When it senses someone, it should alert you by taking off into the air. You can also make it beep.",
    },
    {
        name: "Pathfinder",
        index: 8,
        description: "Program the drone to take off and approach an angled wall. The wall may have either of two shapes. Either way, the drone should navigate around the obstacle by detecting the wall and moving either left or right, depending on the set up.",
    },
    {
        name: "Eaten by Piranhas",
        index: 9,
        description: "You’ve been hired to build a prototype for a new game show. Contestants will fly across a pit of piranhas on a big drone. While crossing a 3 meter gap, the drone should stop three times and prompt the user to answer a multiple choice trivia question. If they get all three right, it should reach the other side. Otherwise, its light should turn red and it should land immediately among the piranhas.",
    },
    {
        name: "Emergency Traffic Light",
        index: 10,
        description: "You’ve been hired by the city to build an emergency traffic light that can control traffic during a power outage. Your drone should hover in place and alternate the color of its light. It should be green for 6 seconds, yellow for 2 seconds, red for 6 seconds, then back to green to continue the loop. You can set up a manual override that checks in with the user at the end of every three loops. The user should be able to type “red,” “green,” or “yellow” to change the color of the light.",
    },
    {
        name: "Complex Movement",
        index: 11,
        description: "Fly your drone to a point more than 2 meters away, moving in a sine wave pattern horizontally, staying level with the floor. When it returns, trace a sine wave vertically, moving up and down.",
    },
    {
        name: "Skyhook",
        index: 12,
        description: "Use a drone, yarn, and a plastic straw to manually pilot a drone to pick up a target with a paper hook on top. Move the target from one tabletop to another.",
    },
    {
        name: "Watcher on the Wall",
        index: 13,
        description: "Program your drone to take off, then rise slowly to peer over the top of a wall. It needs to be able to see over the top, but if it goes more than 50 centimeters higher than the top of the wall, it is exposed to attack and the challenge is failed.",
    },
    {
        name: "Red Light / Green Light",
        index: 14,
        description: "Program your drone to fly in a continuous circle. Every 1 second, the drone should randomly alternate between having a red light and a green light. When the light is red, it should stop and hover in place. When it’s green, it should move.",
    },
    {
        name: "Loon Migration",
        index: 15,
        description: "You and your teammate must sit at tables with 2 meters of space in between them, representing a river. You must smuggle three precious dollars across the river. The partner on the east bank has: 3 dollar coins, and up to 2 meters of yarn. They must get the coins across the river, they cannot throw them. The partner on the west bank has: A laptop and a drone. If the drone lands in the river, a third person may step in to return it to the west bank. You have 8 minutes to complete the challenge once you start, and you cannot step in the river.",
    },
    {
        name: "Double Helix",
        index: 16,
        description: "Two teams must work together for this trial. Program your drones to fly towards each other, each trailing a piece of yarn, and twist around each other in a rising double helix shape.",
    },
]

dronePilots = {
    "cardboard box": {
        pilots: [
            "Miles",
            "Adi"
        ],
        feats: [9, 12, 7, 10, 14, 8, 11]
    },
    "Achoo" : {
        pilots: [
            "Ahmad",
            "Abdullah"
        ],
        feats: [9, 12, 8, 10, 7, 13, 14]
    },
    "DAdrone" : {
        pilots: [
            "Adam",
            "Tobi"
        ],
        feats: [9, 10, 12, 7, 15]
    },
    "Cloudrider" : {
        pilots: [
            "Sam",
            "Kiran"
        ],
        feats: [9, 12, 10, 15]
    },
    "Boeing" : {
        pilots: [
            "Miles",
            "Ahmad"
        ],
        feats: [6, 7]
    },
    "Arnold Palmer" : {
        pilots: [
            "Abdullah",
            "Kiran"
        ],
        feats: [6]
    },
    "Ragingriver" : {
        pilots: [
            "Adi",
            "Tobi"
        ],
        feats: [6]
    },
    "Obi-Wan Droneobi" : {
        pilots: [
            "Adam",
            "Sam"
        ],
        feats: [6]
    }
}