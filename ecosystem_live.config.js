module.exports = {
    apps: [
        {
            name: "live-base",
            script: "npm",
            args: "start",
            cwd: "/var/www/web-site/web-doctorabad/apps/base",
            env: {
                NODE_ENV: "production",
                PORT: 3010
            }
        },
        {
            name: "live-market",
            script: "npm",
            args: "start",
            cwd: "/var/www/web-site/web-doctorabad/apps/market",
            env: {
                NODE_ENV: "production",
                PORT: 3020
            }
        },
        {
            name: "live-learn",
            script: "npm",
            args: "start",
            cwd: "/var/www/web-site/web-doctorabad/apps/learn",
            env: {
                NODE_ENV: "production",
                PORT: 3030
            }
        },
        {
            name: "live-exam",
            script: "npm",
            args: "start",
            cwd: "/var/www/web-site/web-doctorabad/apps/exam",
            env: {
                NODE_ENV: "production",
                PORT: 3040
            }
        },
        {
            name: "live-pharmacy",
            script: "npm",
            args: "start",
            cwd: "/var/www/web-site/web-doctorabad/apps/pharmacy",
            env: {
                NODE_ENV: "production",
                PORT: 3050
            }
        },
        {
            name: "live-clinic",
            script: "npm",
            args: "start",
            cwd: "/var/www/web-site/web-doctorabad/apps/clinic",
            env: {
                NODE_ENV: "production",
                PORT: 3060
            }
        },
        {
            name: "live-tools",
            script: "npm",
            args: "start",
            cwd: "/var/www/web-site/web-doctorabad/apps/tools",
            env: {
                NODE_ENV: "production",
                PORT: 3070
            }
        },
    ]
};