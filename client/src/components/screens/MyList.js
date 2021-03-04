import React from 'react'

function MyList() {
    return (
        <div style={{
            maxWidth: "1050px",
            margin: "0px auto",
        }}>
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "18px 0px",
                borderBottom: "1px solid grey"
            }}>
                <div>
                    <img
                        style={{ width: "160px", height: "160px", borderRadius: "80px" }} 
                        src="https://images.unsplash.com/photo-1559969143-b2defc6419fd?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8Z2FtZXJ8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                        />
                </div>
                <div class="white-text">
                    <h4>Pro gamer</h4>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "110%",
                    }}>
                        <h6>5 year coin</h6>
                        <h6>70 ratings</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyList
