import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface CountryDetail {
    id: number;
    idd: string;
    flags: string;
    cca2: string;
    cca3: string;
    name: string;
    native_name: string;
    alternativ_name: Array<string>;
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: CountryDetail | null;
}

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "600px",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    overflowY: "auto",
    backgroundColor: "#f5f5f5"
};

const fontTitle = {
    fontSize: "1rem",
    fontWeight: "bold",
}

const DataModal: React.FC<ModalProps> = ({ isOpen, onClose, data }) => {
    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={style}>
                <div className="flex justify-end items-center">
                    <IconButton
                        onClick={onClose}
                        className="text-gray-600 hover:text-red-500"
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
                <Typography
                    id="modal-title"
                    variant="h5"
                    component="h2"
                    className="pb-5 tex-start"
                    style={{ fontWeight: "600" }}
                >
                    Country Details
                </Typography>
                {data ? (
                    <Box className="space-4">
                        <Box className="grid grid-cols-2 gap-4">
                            {/* <Box className="flex items-center space-x-4"> */}
                            <Typography variant="body1" style={fontTitle}>
                                Flag:
                            </Typography>
                            <img
                                src={data.flags}
                                alt={`${data.name} flag`}
                                className="w-12 h-8"
                            />
                            {/* </Box> */}
                            <Typography variant="h6" style={fontTitle}>
                                Name:
                            </Typography>
                            <Typography variant="body1">{data.name}</Typography>

                            <Typography variant="h6" style={fontTitle}>
                                Native Name:
                            </Typography>
                            <Typography variant="body1">{data.native_name}</Typography>

                            <Typography variant="h6" style={fontTitle}>
                                IDD:
                            </Typography>
                            <Typography variant="body1">{data.idd}</Typography>

                            <Typography variant="h6" style={fontTitle}>
                                CCA2:
                            </Typography>
                            <Typography variant="body1">{data.cca2}</Typography>

                            <Typography variant="h6" style={fontTitle}>
                                CCA3:
                            </Typography>
                            <Typography variant="body1">{data.cca3}</Typography>

                            <Typography variant="h6" style={fontTitle}>
                                Alternative Names:
                            </Typography>
                            <Typography variant="body1">
                                {data.alternativ_name
                                    ? data.alternativ_name.join(", ")
                                    : "None"}
                            </Typography>
                        </Box>
                    </Box>
                ) : (
                    <Typography variant="h6" className="text-center">
                        No data available
                    </Typography>
                )}
            </Box>
        </Modal>
    );
};

export default DataModal;
