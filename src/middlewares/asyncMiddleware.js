export const asyncHandler = (controller) => {
    return async (req, res, next) => {
      try {
        const result = await controller(req, res, next);
  
        if (res.headersSent) return;
  
        if (result?.headers) {
          for (const [key, value] of Object.entries(result.headers)) {
            res.setHeader(key, value);
          }
        }
  
        if (result?.success === false) {
          const status = Number.isInteger(result.status) ? result.status : 400;
          return res
            .status(status)
            .json({ success: false, message: result.message || "Error" });
        }
  
        const status = Number.isInteger(result?.status) ? result.status : 200;
        res.status(status).json({
          success: true,
          ...(result?.message && { message: result.message }),
          data: result?.data ?? result,
        });
      } catch (err) {
        if (!res.headersSent) {
          const status = Number.isInteger(err.status) ? err.status : 500;
          res.status(status).json({
            success: false,
            message: err.message || "Internal Server Error",
          });
        }
      }
    };
  };