// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.20;

contract Jobs {
    struct Job {
        address author;
        address worker;
        string description;
        uint price;
        bool isFinished;
    }

    Job[] jobs;

    event jobAdded(
        address indexed author,
        string description,
        uint price,
        uint id,
        bool isFinished
    );
    event jobTaken(address indexed worker, uint id);
    event jobIsFinishedAndPaid(
        address indexed author,
        address indexed worker,
        uint id,
        uint pricePaid
    );

    error NotAuthorized(address);
    error AlreadyTaken();

    function addJob(string calldata _description) external payable {
        Job memory job = Job(msg.sender,address(0) ,_description, msg.value, false) ;
        jobs.push(job);
        emit jobAdded(msg.sender,_description,msg.value,jobs.length-1,job.isFinished);
        
    }

    function takeJob(uint _id) external {
        if(jobs[_id].worker!=address(0)){
            revert AlreadyTaken();
        }

        jobs[_id].worker = msg.sender;
        emit jobTaken(msg.sender, _id);
    }

    function setIsFinishedAndPay(uint _id) external {
        if(msg.sender != jobs[_id].author){
           revert NotAuthorized(msg.sender); 
        }
       
        jobs[_id].isFinished = true;
        (bool result,)= jobs[_id].worker.call{value: jobs[_id].price}("");
        require(result, "Not paid");
        emit jobIsFinishedAndPaid(jobs[_id].author, jobs[_id].worker, _id, jobs[_id].price);
    }
}
