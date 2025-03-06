module.exports = {
    apps: [
        {
            name: "mono-market",
            script: "npm",
            args: "start",
            cwd: "/var/www/develop/doctorabad/apps/market",
            env: {
                NODE_ENV: "production",
                PORT: 3005 // Choose different port for each app
            }
        },
        {
            name: "mono-learn",
            script: "npm",
            args: "start",
            cwd: "/var/www/develop/doctorabad/apps/learn",
            env: {
                NODE_ENV: "production",
                PORT: 3007
            }
        }
    ]
};