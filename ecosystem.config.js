module.exports = {
    apps: [
        {
            name: "mono-base",
            script: "npm",
            args: "start",
            cwd: "/var/www/develop/doctorabad/apps/base",
            env: {
                NODE_ENV: "production",
                PORT: 3001 // Choose different port for each app
            }
        },
        {
            name: "mono-market",
            script: "npm",
            args: "start",
            cwd: "/var/www/develop/doctorabad/apps/market",
            env: {
                NODE_ENV: "production",
                PORT: 3002 // Choose different port for each app
            }
        },
        {
            name: "mono-learn",
            script: "npm",
            args: "start",
            cwd: "/var/www/develop/doctorabad/apps/learn",
            env: {
                NODE_ENV: "production",
                PORT: 3003
            }
        }
    ]
};