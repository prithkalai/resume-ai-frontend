import { useState } from "react";
import JDResumeInput from "./JDResumeInput";
import SuggestionTabs from "./SuggestionTabs";

export type ListData = { old: string; new: string; isRemoved: boolean };
export type SuggestionData = {
  technical_skills: ListData[];
  bullets: ListData[];
};

const testData = {
  technical_skills: [
    {
      old: "Java, JavaScript, TypeScript, ES6, Python",
      new: "Java, JavaScript, TypeScript, ES6, Python, AngularJS",
    },
    {
      old: "Spring, Spring Boot, Node.js, Express.js, Spring MVC, JSON, XML",
      new: "Spring, Spring Boot, Node.js, Express.js, Spring MVC, JSON, XML, Web Services, REST APIs",
    },
    {
      old: "React.js, Radix UI, Tailwind CSS, HTML5, CSS3, UI/UX",
      new: "React.js, Radix UI, Tailwind CSS, HTML5, CSS3, UI/UX, JQuery",
    },
    {
      old: "AWS (EC2, Auto-Scaling, RDS, Lambda) Docker, Railway, CI/CD, Git",
      new: "AWS (EC2, Auto-Scaling, RDS, Lambda) Docker, Railway, CI/CD, Git,  Computing",
    },
    {
      old: "Code Reviews, Test Driven Development",
      new: "Code Reviews, Test Driven Development, Design Patterns",
    },
  ],
  bullets: [
    {
      old: "Developed 8+ RESTful API endpoints in Spring Boot with Redis Caching, reducing data retrieval time by 15%.",
      new: "Developed 8+ RESTful APIs in Spring Boot with Redis, cutting data retrieval time by 15% to improve application performance.",
    },
    {
      old: "Built message queues for asynchronous communication b/w microservices, reducing system load by 30%.",
      new: "Implemented message queues for microservices, decreasing system load by 30% and enhancing workflow efficiency.",
    },
    {
      old: "Completed 200+ hours of hands-on professional development in Java Stack, enabling contribution to live projects.",
      new: "Completed 200+ professional Java training hours, enhancing skills for effective contributions to live product development.",
    },
    {
      old: "Enhanced PostgreSQL schema design by restructuring tables, cutting query times by 5% for delivery/user data.",
      new: "Improved PostgreSQL schema, restructuring tables to reduce query times by 5% for user data access in application.",
    },
    {
      old: "Executed unit tests coding across React.js components and Node.js services, reducing bugs by 30%.",
      new: "Conducted unit tests for React.js and Node.js, decreasing bugs by 30% and ensuring well-designed testable code.",
    },
    {
      old: "Refined Node.js backend, slashing website loading times by 5%, and improving user accessibility.",
      new: "Optimized Node.js backend, reducing website load times by 5% and improving application user experience.",
    },
    {
      old: "Developed a scalable MySQL schema in Amazon RDS to manage sensitive data for 50+ employees.",
      new: "Developed scalable MySQL schema on AWS RDS to manage data for 50+ employees, ensuring secure enterprise application.",
    },
    {
      old: "Designed 10+ REST API endpoints using Spring Boot, deployed on AWS EC2 for scalable HR data management.",
      new: "Designed 10+ REST APIs in Spring Boot, deployed on AWS EC2 for scalable HR data management in enterprise system.",
    },
    {
      old: "Configured AWS Route 53 for efficient traffic routing to EC2 instances, ensuring 99.9% uptime.",
      new: "Configured AWS Route 53 for traffic routing to EC2, ensuring 99.9% uptime for enterprise level application.",
    },
    {
      old: "Enabled AWS migration, cutting costs by 80% over on-premises solutions.",
      new: "Led AWS migration that cut infrastructure costs by 80% compared to on-premises for cost effective solution.",
    },
    {
      old: "Revamped server-side logic using Node.js, leading to a 10% improvement in RESTful API response times.",
      new: "Revamped server-side logic with Node.js, improving REST API response times by 10% for better user experience.",
    },
    {
      old: "Conducted API performance testing and debugging with Postman, troubleshooting 10+ critical issues.",
      new: "Executed API performance testing and debugging using Postman, resolving 10+ critical issues and ensured system uptime.",
    },
    {
      old: "Implemented query indexing in MongoDB, resulting in 22% quicker load times of business data.",
      new: "Implemented query indexing in MongoDB, improving business data load times by 22% and application efficiency.",
    },
    {
      old: "Architected Node.js backend, achieving efficient task management with MongoDB and Mongoose for data storage.",
      new: "Architected Node.js backend for task management with MongoDB and Mongoose, ensuring efficient data storage system.",
    },
    {
      old: "Implemented 10+ RESTful API endpoints for managing users, tasks, agendas, and categories.",
      new: "Implemented 10+ REST APIs for managing users, tasks, agendas, and categories, for comprehensive feature set.",
    },
    {
      old: "Authored custom React hooks for Axios requests, streamlining data fetching processes.",
      new: "Developed custom React hooks for Axios requests, streamlining data fetching process in frontend application.",
    },
    {
      old: "Orchestrated a dual-server setup using Spring Boot and ngrok in Google Collab, enabling user access to ML models.",
      new: "Orchestrated dual-server setup with Spring Boot and ngrok for user access to ML models, enabling data analysis.",
    },
    {
      old: "Constructed an interactive React.js dashboard for real-time explainability of 4,000,000+ data points.",
      new: "Developed interactive React.js dashboard for real-time explainability of 4M+ data points, enhancing user experience.",
    },
    {
      old: "Spearheaded a team of 4 members, boosting efficiency by 20%, and meeting a 2-month deadline.",
      new: "Led a 4-member team, improving efficiency by 20% and meeting project deadline within a fast paced environment.",
    },
    {
      old: "Deployed the application on Vercel, maintaining 99% uptime and serving users across 50+ countries.",
      new: "Deployed application on Vercel, maintaining 99% uptime and serving users across 50+ countries for wide access.",
    },
    {
      old: "Leveraged RAWG’s game API via RESTful services, providing real-time updates on a catalog of 10,000+ games.",
      new: "Leveraged RAWG’s API via REST services, providing real-time updates for 10,000+ games in content system.",
    },
    {
      old: "Integrated an adaptive Dark/Light mode, enhancing browsing experience, praised by 85% of user feedback.",
      new: "Integrated Dark/Light mode, improving user browsing experience and praised by 85% user feedback for product.",
    },
  ],
};

const Dashboard = () => {
  const [data, setData] = useState<SuggestionData>({
    technical_skills: testData.technical_skills.map((item) => ({
      ...item,
      isRemoved: false,
    })),
    bullets: testData.bullets.map((item) => ({
      ...item,
      isRemoved: false,
    })),
  });

  // const handleSuggestionData = () => {
  //   // Data coming in from simulated API call
  //   let modifiedData: SuggestionData = {
  //     technical_skills: [],
  //     bullets: [],
  //   };

  //   testData.bullets.forEach((data) => {
  //     modifiedData.bullets.push({
  //       old: data.old,
  //       new: data.new,
  //       isRemoved: false,
  //     });
  //   });

  //   testData.technical_skills.forEach((data) => {
  //     modifiedData.technical_skills.push({
  //       old: data.old,
  //       new: data.new,
  //       isRemoved: false,
  //     });
  //   });

  //   setData(modifiedData);
  // };

  return (
    <>
      <JDResumeInput />
      <SuggestionTabs data={data} setData={setData} />
    </>
  );
};

export default Dashboard;
