const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMIMI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 2,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};
const generationConfig2 = {
  temperature: 2,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};


 export const courseOutline = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Generate a study material for Python for Exam and level of difficulty will be EASY with summery of course, List of Chapters along with summery for each chapter,emoji for each chapter, Topic list in each chapter, All resule in JSON format\n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"course_title\": \"Python for Beginners: Exam Prep (Easy)\",\n  \"course_summary\": \"This course provides a gentle introduction to Python programming, focusing on the fundamental concepts required for a basic understanding. It is designed for individuals with little to no prior programming experience and prepares you for a beginner-level Python exam. The course emphasizes practical application with simple examples and exercises.\",\n  \"difficulty\": \"Easy\",\n  \"chapters\": [\n    {\n      \"chapter_title\": \"Introduction to Python\",\n      \"emoji\": \"👋\",\n      \"summary\": \"This chapter introduces the Python programming language, its history, and its applications. You will learn how to set up your environment and run your first Python program.\",\n      \"topics\": [\n        \"What is Python?\",\n        \"Why use Python?\",\n        \"Setting up Python Environment\",\n        \"Running your first Python program (Hello World!)\"\n      ]\n    },\n    {\n      \"chapter_title\": \"Basic Data Types\",\n      \"emoji\": \"🔢\",\n      \"summary\": \"This chapter covers the fundamental data types in Python, including integers, floats, strings, and booleans. You will learn how to create, store, and manipulate these different data types.\",\n      \"topics\": [\n        \"Integers (int)\",\n        \"Floating-point numbers (float)\",\n        \"Strings (str)\",\n        \"Booleans (bool)\",\n        \"Type conversion (casting)\"\n      ]\n    },\n    {\n      \"chapter_title\": \"Variables and Operators\",\n      \"emoji\": \"🧮\",\n      \"summary\": \"This chapter explains how to declare and use variables to store data. You will also learn about basic arithmetic, comparison, and logical operators.\",\n      \"topics\": [\n        \"Declaring and assigning variables\",\n        \"Variable naming conventions\",\n        \"Arithmetic operators (+, -, *, /, %, //, **)\",\n        \"Comparison operators (==, !=, >, <, >=, <=)\",\n        \"Logical operators (and, or, not)\",\n        \"Assignment operators (+=, -=, *=, /=)\"\n      ]\n    },\n    {\n      \"chapter_title\": \"Input and Output\",\n      \"emoji\": \"⌨️\",\n      \"summary\": \"This chapter focuses on how to receive input from the user and display output using Python's built-in functions. You will learn how to interact with the user and show results.\",\n      \"topics\": [\n        \"The `input()` function\",\n        \"The `print()` function\",\n        \"String formatting (f-strings)\",\n        \"Basic user interaction\"\n      ]\n    },\n    {\n      \"chapter_title\": \"Conditional Statements (if, elif, else)\",\n      \"emoji\": \"🚦\",\n      \"summary\": \"This chapter introduces conditional statements which allow your program to make decisions based on certain conditions. You'll learn to control the flow of execution using `if`, `elif`, and `else`.\",\n      \"topics\": [\n        \"The `if` statement\",\n        \"The `elif` statement\",\n        \"The `else` statement\",\n        \"Nested conditional statements\",\n        \"Using conditions with logical operators\"\n      ]\n    },\n    {\n      \"chapter_title\": \"Basic Loops (for and while)\",\n      \"emoji\": \"🔄\",\n      \"summary\": \"This chapter covers loops, which enable you to execute code repeatedly. You will learn how to use `for` and `while` loops for different scenarios.\",\n      \"topics\": [\n        \"The `for` loop\",\n        \"Iterating through strings and numbers\",\n        \"The `range()` function\",\n        \"The `while` loop\",\n        \"Loop control statements (`break` and `continue`)\"\n      ]\n    },\n    {\n      \"chapter_title\": \"Introduction to Lists\",\n      \"emoji\": \"📃\",\n      \"summary\": \"This chapter will introduce you to the basics of Lists, one of the most fundamental data structures in python. You will learn how to create lists, access items, and modify them\",\n      \"topics\": [\n        \"Creating lists\",\n        \"Accessing list items by index\",\n        \"Modifying list items\",\n        \"List methods (append, insert, remove)\",\n         \"List Length\",\n        \"Looping through lists\"\n      ]\n    },\n    {\n      \"chapter_title\": \"Working with Functions\",\n       \"emoji\":\"🛠️\",\n       \"summary\":\"This chapter explains how to create and use functions to organize and reuse code. You will learn how to define functions with arguments and return values, and understand the concept of scope.\",\n       \"topics\": [\n        \"Defining functions with `def`\",\n        \"Function arguments and parameters\",\n        \"Return statements\",\n         \"Function Scope\",\n         \"Calling functions\"\n       ]\n     }\n  ]\n}\n```\n"},
        ],
      },
    ],
  });

  // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  // console.log(result.response.text());

  export const generateNotesAiModel = model.startChat({
    generationConfig2,
    history: [
      {
        role: "user",
        parts: [
          {text: "Generate exam material detail content for each chapter, Make sure to includes all topic point in the content, make sure to give content in HTML format (Do not Add HTML, Head, Body, title tag). The chapters :  {\n\"chapter_title\": \"Core Concepts & Setup\",\n\"emoji\": \"⚙️\",\n\"summary\": \"Introduction to Tailwind's utility-first approach, its setup in various project types and understand the configuration process. This covers the core ideas behind Tailwind and initial project setup.\",\n\"topics\": [\n\"Utility-First Approach\",\n\"Installation via CDN\",\n\"Installation using npm and CLI\",\n\"Understanding the Tailwind config file\",\n\"Basic Configuration Customization\"\n]\n}"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```html\n    \n        <h2>Core Concepts & Setup ⚙️</h2>\n        \n            <p><strong>Summary:</strong> Introduction to Tailwind's utility-first approach, its setup in various project types and understand the configuration process. This covers the core ideas behind Tailwind and initial project setup.</p>\n        \n        \n            <h3>Topic: Utility-First Approach</h3>\n            \n                \n                    \n                        <p>\n                        Explain what a utility-first approach means in the context of CSS frameworks like Tailwind CSS. Emphasize that, instead of predefined components or selectors, developers use small utility classes. Example usecase will also explain. \n                        </p>\n                         <p> \n                        Identify some typical issues with conventional CSS and how the utility-first approach resolves them. \n                        </p>\n                    \n                        <ul>\n                                    <li>\n                                    Compare the traditional CSS approach versus the utility-first one, focusing on writing less or avoiding custom styles and the maintainability.\n                                    </li>\n                                    <li> Discuss the concept of rapid prototyping using Tailwind by composing the necessary style with predefined style classes\n                                        </li>\n                                </ul>\n            \n            \n            <h3>Topic: Installation via CDN</h3>\n           \n               \n                     <p>\n                        Describe how to add the CDN link to HTML file in project . What advantages/disadvantages of CDN installation process comparing to others approach?. How we could make a development on client-side and view the changes real time on screen. \n                     </p>\n               \n                        <ul>\n                           <li> Explain limitations of using the CDN for production setups, such as performance considerations (file caching and the performance) and other configuration needs that CDN link cannot provide\n                                    </li>\n                           <li>Provide the proper script of the link for inclusion into the head section of HTML file.\n                            </li>\n                                 </ul>\n\n            \n            \n            <h3>Topic: Installation using npm and CLI</h3>\n           \n                    <p>Explain installation process via node using <strong> npm/yarn/pnpm</strong>. What each package means in terms of building an asset pipeline for the project?. What advantages provides usage this method comparing to others? Explain command to run the server on watch-mode for auto changes while development. \n                    </p>\n            \n                \n                        <ul>\n                           <li> Show each step process using command line. Initialize the npm, installation for tailwind, postcss and autoprefixer. Initialize configuration and folder structures for building an asset project using <strong>tailwindcss init -p</strong></li>\n                           <li>Explain how we could connect tailwind styles on each component from folder structure </li>\n                        </ul>\n\n             \n            \n            <h3>Topic: Understanding the Tailwind config file</h3>\n           \n                \n                    \n                        <p> Describe basic usage of the <strong>tailwind.config.js</strong>. Understand core values of content, theme, and plugins section and how tailwind library uses them.</p>\n                    \n                      <ul>\n                            <li> Understand how a plugin work on a component in tailwind config file. Identify that it contains both configuration and content-source path and we customize both of it.. </li>\n                            <li> How theme key provides all variables to build styles, layout and all basic structure of the design\n                            </li>\n                    \n                        </ul>\n\n           \n           \n            \n            <h3>Topic: Basic Configuration Customization</h3>\n           \n                    <p>Explain some common scenario when basic config need to be customized: color palette, font families, container, margin/padding etc </p>\n                \n                \n                         <ul>\n                            <li>How to extend default styles. Show basic scenario and how to build an independent customized colors palette, also build from predefined one in the tailwind core lib.</li>\n                             <li> Provide code examples for customized values and extend/rewrite properties. Demonstrate the effect on compiled CSS. Provide examples with: Container settings, Screen (breakpoints)  , spacing, fonts family. </li>\n                         </ul>\n    \n    \n```\n"},
        ],
      },
    ],
  });


  export const GenerateStudyTypeContentAiModel = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Generate the flashcard on  topic: Flutter Fundamentals, User Interface(UI) Develpment,Basic App Navigation in JSON format with fornt back content,Maximum 15"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n[\n  {\n    \"front\": \"What is a 'Widget' in Flutter?\",\n    \"back\": \"Widgets are the building blocks of Flutter UIs. Everything in Flutter is a widget - from text to buttons to layouts.\"\n  },\n  {\n    \"front\": \"What are the two main types of widgets?\",\n     \"back\":\"Stateless and Stateful widgets. Stateless widgets don't change, Stateful can update dynamically\"\n   },\n  {\n     \"front\": \"Name some common layout widgets in Flutter?\",\n     \"back\": \"Row, Column, Container, Stack, Center, Padding\"\n   },\n    {\n    \"front\": \"How to display text in Flutter?\",\n    \"back\": \"Using the 'Text' widget. e.g., `Text('Hello World')`\"\n   },\n   {\n     \"front\":\"How do you center a widget?\",\n    \"back\": \"Use the Center widget `Center(child: Widget())`\"\n   },\n   {\n      \"front\":\"What's the role of 'MaterialApp' Widget?\",\n       \"back\":\"The base widget for a Flutter application which uses Material Design.\"\n   },\n {\n    \"front\": \"What's 'Scaffold' widget?\",\n     \"back\":\"Basic visual structure for a screen including App Bar, body and optional drawers.\"\n   },\n {\n    \"front\": \"How do you add Padding around a widget?\",\n      \"back\":\"Using the Padding widget `Padding(padding: EdgeInsets.all(16.0), child: MyWidget(),)`\"\n   },\n {\n   \"front\": \"Explain navigation in flutter\",\n    \"back\": \"Moving between screens,typically achieved through Routes and Navigator.\"\n },\n{\n \"front\": \"What is a Navigator?\",\n   \"back\": \"A widget that manages a stack of routes which represent a UI Screen\"\n},\n {\n    \"front\":\"How do you perform basic navigation in flutter?\",\n     \"back\":\"Navigator.push(context, MaterialPageRoute(builder:(context)=> MyNewPage()))\"\n },\n {\n   \"front\":\"How to move to a previous Screen in the Navigator?\",\n    \"back\":\"Using `Navigator.pop(context)`.\"\n },\n{\n    \"front\":\"What's 'BuildContext'?\",\n   \"back\": \"Handle to location in Widget tree used for widget retrieval and routing etc. .\"\n},\n {\n  \"front\": \"What does the 'build()' method do in Flutter?\",\n  \"back\": \"It describes the UI by building a new Widget based on changes in properties.\"\n},\n   {\n     \"front\": \"What's `hot reload`?\",\n     \"back\": \"A flutter feature allowing instant code changes reflection on application during development.\"\n   }\n]\n```"},
        ],
      },
    ],
  });

 export const GenerateQuizAiModel = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Generate Quiz on topic: Flutter Fundamentals,User Interface (UI) Developement,Basic App Navigation with Question and Options along with correct answer in JSON format\n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"quizTitle\": \"Flutter UI Development & Basic Navigation\",\n  \"questions\": [\n    {\n      \"questionText\": \"What is the primary purpose of a 'Widget' in Flutter?\",\n      \"options\": [\n        \"To manage app data\",\n        \"To handle user input\",\n        \"To describe a part of the user interface\",\n        \"To perform network requests\"\n      ],\n      \"correctAnswer\": \"To describe a part of the user interface\"\n    },\n    {\n      \"questionText\": \"Which layout widget arranges its children in a horizontal manner?\",\n      \"options\": [\n        \"Column\",\n        \"Row\",\n        \"Stack\",\n        \"Container\"\n      ],\n      \"correctAnswer\": \"Row\"\n    },\n    {\n      \"questionText\": \"What is the role of the 'MaterialApp' widget?\",\n      \"options\": [\n        \"It displays a list of items.\",\n        \"It handles the theme of the application and navigation.\",\n        \"It allows adding constraints to a Widget.\",\n        \"It fetches the data from the API.\"\n      ],\n      \"correctAnswer\": \"It handles the theme of the application and navigation.\"\n    },\n    {\n      \"questionText\": \"What type of widget is used for making a text field?\",\n      \"options\": [\n        \"TextField\",\n         \"TextWidget\",\n         \"TextButton\",\n        \"Label\"\n      ],\n      \"correctAnswer\": \"TextField\"\n    },\n     {\n       \"questionText\": \"How to add margins to a Widget in flutter?\",\n      \"options\": [\n           \"Using margin property.\",\n          \"By wrapping inside the Margin widget.\",\n         \"Using Padding widget\",\n        \"Using spacing propery of row/column.\"\n      ],\n      \"correctAnswer\": \"Using Padding widget\"\n    },\n    {\n      \"questionText\": \"What is the purpose of 'Navigator' in Flutter?\",\n      \"options\": [\n         \"It is used to manage the widgets on screen.\",\n        \"It manages the application state\",\n         \"It is used for navigating between different screens/routes.\",\n         \"It is used to fetch the data.\"\n      ],\n      \"correctAnswer\": \"It is used for navigating between different screens/routes.\"\n    },\n    {\n        \"questionText\":\"What method is used to go to the previous route in Flutter navigation?\",\n         \"options\": [\n          \"Navigator.back()\",\n           \"Navigator.pop()\",\n          \"Navigator.goBack()\",\n           \"Navigator.remove()\"\n            ],\n       \"correctAnswer\":\"Navigator.pop()\"\n      },\n     {\n       \"questionText\":\"What widget is commonly used to render a simple image?\",\n      \"options\": [\n        \"ImageWidget\",\n        \"ImageBox\",\n        \"Image\",\n         \"Picture\"\n       ],\n      \"correctAnswer\": \"Image\"\n    },\n       {\n         \"questionText\":\"How do you apply a background color to a container in Flutter?\",\n          \"options\":[\n              \"By using background property.\",\n             \"By using Color property.\",\n             \"Using decoration and backgroundColor propery.\",\n            \"It's not possible to change the background.\"\n           ],\n           \"correctAnswer\": \"Using decoration and backgroundColor propery.\"\n        },\n      {\n      \"questionText\":\"How can you center a widget inside a container in Flutter?\",\n      \"options\":[\n            \"Using the 'center' property of container.\",\n            \"Wrapping the widget with the Center widget.\",\n             \"By using alignment property in layout widgets like column.\",\n            \"By adding padding with negative margin.\"\n       ],\n        \"correctAnswer\":\"Wrapping the widget with the Center widget.\"\n      }\n\n  ]\n}\n```\n"},
        ],
      },
    ],
  });

export const GenerateQAAiModel = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Generate Question and Answer on topic: Flutter Fundamentals,User Interface (UI) Developement,Basic App Navigation  in JSON format, (Max 10)"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"questions\": [\n    {\n      \"question\": \"What is Flutter and what is its primary purpose?\",\n      \"answer\": \"Flutter is Google's UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase. Its primary purpose is to enable fast, expressive, and flexible UI development.\"\n    },\n    {\n        \"question\":\"What are the key building blocks of Flutter UI and give 2 examples\",\n         \"answer\":\"Flutter UI is built using widgets. They represent a visual part or interaction component. For instance, examples: Text and container\"\n\n    },\n     {\n       \"question\": \"Explain the concept of the 'widget tree' in Flutter.\",\n      \"answer\": \"The 'widget tree' is a hierarchical structure where the app's UI is constructed. Parent widgets contain and configure child widgets, forming the overall layout.\"\n     },\n     {\n      \"question\": \"What is the difference between a 'StatelessWidget' and a 'StatefulWidget' in Flutter?\",\n       \"answer\":\"A 'StatelessWidget' does not change over time, the information within does not need to change at runtime . A 'StatefulWidget' manages mutable states which could change while the program is running.\"\n     },\n   {\n      \"question\": \"What is the purpose of the 'MaterialApp' widget in Flutter?\",\n      \"answer\": \"The 'MaterialApp' widget sets up the top-level application context with Material Design theming, routes, title, etc, to the whole app .  It is generally a required parent of our application.\"\n     },\n    {\n      \"question\": \"Describe what is the importance of 'Scaffold' Widget.\",\n       \"answer\":\"A scaffold widget is generally needed because provides basic layout of material app screen (appBar, body, navigation, etc.) it’s like giving you the basis to design your screen and how the elements are laid in a correct manner.\"\n     },\n    {\n     \"question\": \"What is the purpose of 'Navigator' class in Flutter?\",\n      \"answer\": \"The 'Navigator' class is used for managing screen navigation. It helps you push, pop and replace widgets on navigation stacks and make your application navigation.\"\n\n    },\n      {\n       \"question\": \"How do you navigate between two named routes in Flutter?\",\n       \"answer\":\"Use 'Navigator.pushNamed()' followed by your declared name route  for pushing, and use 'Navigator.pop' to move back\"\n\n    },\n   {\n        \"question\": \"What is the importance of main() function?\",\n        \"answer\":\"main() function serves as entry point of your flutter app and has function ‘runApp(MyApp());’ usually where our main materialapp class/component will live in\"\n\n    },\n    {\n        \"question\": \"Explain how hot reload helps develop your applications more faster.\",\n         \"answer\": \"Flutter hot reload reloads just the dart code into current application avoiding any unnecessary rebuilding time which allows programmers to focus on what matter most that code part\"\n\n    }\n\n  ]\n}\n```\n"},
        ],
      },
    ],
  });





