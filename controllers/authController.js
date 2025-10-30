const login = async (req, res) => {
    try {
        res.json({
            message: "Login exitoso",
            status: "Success",
        });
    } catch (error) {
        res.status(500).json(
            {  
                message: "Error interno",
                status: "Error", error: error 
            }
        );
    }
};

module.exports = {
    login,
};