module.exports = {
    apps: [
        {
            name: "dev-base",
            script: "npm",
            args: "start",
            cwd: "/var/www/develop/Doctorabad-Web/apps/base",
            env: {
                NODE_ENV: "production",
                PORT: 3001 // Choose different port for each app
            }
        },
        {
            name: "dev-market",
            script: "npm",
            args: "start",
            cwd: "/var/www/develop/Doctorabad-Web/apps/market",
            env: {
                NODE_ENV: "production",
                PORT: 3002 // Choose different port for each app
            }
        },
        {
            name: "dev-learn",
            script: "npm",
            args: "start",
            cwd: "/var/www/develop/Doctorabad-Web/apps/learn",
            env: {
                NODE_ENV: "production",
                PORT: 3003
            }
        },
        {
            name: "dev-exam",
            script: "npm",
            args: "start",
            cwd: "/var/www/develop/Doctorabad-Web/apps/exam",
            env: {
                NODE_ENV: "production",
                PORT: 3004
            }
        },
        {
            name: "dev-pharmacy",
            script: "npm",
            args: "start",
            cwd: "/var/www/develop/Doctorabad-Web/apps/pharmacy",
            env: {
                NODE_ENV: "production",
                PORT: 3005
            }
        },
        {
            name: "dev-clinic",
            script: "npm",
            args: "start",
            cwd: "/var/www/develop/Doctorabad-Web/apps/clinic",
            env: {
                NODE_ENV: "production",
                PORT: 3006
            }
        },
        {
            name: "dev-tools",
            script: "npm",
            args: "start",
            cwd: "/var/www/develop/Doctorabad-Web/apps/tools",
            env: {
                NODE_ENV: "production",
                PORT: 3007
            }
        },{
        name: "dev-insurance",
        script: "npm",
        args: "start",
        cwd: "/var/www/develop/Doctorabad-Web/apps/insurance",
        env: {
            NODE_ENV: "production",
            PORT: 3008
        }},
        {
            name: "dev-download",
            script: "npm",
            args: "start",
            cwd: "/var/www/develop/Doctorabad-Web/apps/download",
                        env: {
                NODE_ENV: "production",
                PORT: 3009
            }
        },
    ]
};