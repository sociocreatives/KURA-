interface AppConfig {
  DB: {
    USER: string;
    PASSWORD: string;
    HOST: string;
    PORT: number;
    NAME: string;
    ENVIRONMENT: string;
  };
  APP: {
    PORT: number;
    NAME: string;
  };
  JWT_SECRET: string;
}

// ACTUAL CONFIGURATIONS
const appConfig: AppConfig = {
  DB: {
    USER: "root",
    PASSWORD: "Avery@123",
    PORT: 3306,
    NAME: "portalweighbridge",
    HOST: "localhost",
    ENVIRONMENT: "production",
  },
  APP: {
    PORT: 4000,
    NAME: "Indicator",
  },
  JWT_SECRET: "121321231131313212asada3wweawererwerwerwerwrwe",
};

export default appConfig;
