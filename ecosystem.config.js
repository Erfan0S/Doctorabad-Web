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
        },
        {
            name: "mono-exam",
            script: "npm",
            args: "start",
            cwd: "/var/www/develop/doctorabad/apps/exam",
            env: {
                NODE_ENV: "production",
                PORT: 3004
            }
        },
        {
            name: "mono-pharmacy",
            script: "npm",
            args: "start",
            cwd: "/var/www/develop/doctorabad/apps/pharmacy",
            env: {
                NODE_ENV: "production",
                PORT: 3005
            }
        },
        {
            name: "mono-clinic",
            script: "npm",
            args: "start",
            cwd: "/var/www/develop/doctorabad/apps/clinic",
            env: {
                NODE_ENV: "production",
                PORT: 3006
            }
        },
        {
            name: "mono-tools",
            script: "npm",
            args: "start",
            cwd: "/var/www/develop/doctorabad/apps/tools",
            env: {
                NODE_ENV: "production",
                PORT: 3007
            }
        },
        {
            name: "mono-download",
            script: "npm",
            args: "start",
            cwd: "/var/www/develop/doctorabad/apps/download",
            env: {
                NODE_ENV: "production",
                PORT: 3008
            }
        },
    ]
};