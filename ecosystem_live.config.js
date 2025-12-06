module.exports = {
    apps: [
        {
            name: "live-base",
            script: "npm",
            args: "start",
            cwd: "/var/www/web-site/web-doctorabad/apps/base",
            env: {
                NODE_ENV: "production",
                PORT: 3010 // Choose different port for each app
            }
        },
        {
            name: "live-market",
            script: "npm",
            args: "start",
            cwd: "/var/www/web-site/web-doctorabad/apps/market",
            env: {
                NODE_ENV: "production",
                PORT: 3020 // Choose different port for each app
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
    ]
};