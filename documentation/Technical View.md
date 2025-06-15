
# High-level Architecture

## The following diagram represents the use case portion of the overall solution:


![](https://anypoint.mulesoft.com/exchange/org.mule.examples/mulesoft-accelerator-for-financial-services/1.12.0/external-resources/6b0a00fbd42c1f7a558452119f6c4f9669c8f81c/68747470733a2f2f7777772e6d756c65736f66742e636f6d2f6578742f736f6c7574696f6e732f696d616765732f66696e732d637573746f6d65726f6e626f617264696e672d6172636869746563747572652e706e67)

## Objectives
- Support the receipt and processing of a new loan application
- Support the submission of loan documents and receipt of electronic signatures
- Create a new customer and loan account in the target financial system
- Provide a means for customers to view their customer and loan account details

## Use Case Considerations
- Must support loan application submission and processing workflow
- Must support customer and account synchronization to a system of record
- Must support the generation of loan agreement documents and capture receipt of signatures from individuals

![](https://anypoint.mulesoft.com/exchange/org.mule.examples/mulesoft-accelerator-for-financial-services/1.12.0/external-resources/52b8aa76523f362d4363553579663728e3ff9303/68747470733a2f2f7777772e6d756c65736f66742e636f6d2f6578742f736f6c7574696f6e732f696d616765732f66696e732d636f72652d62616e6b2d666f756e646174696f6e2d6172636869746563747572652e706e67)

### Customer update sync from Core Banking
The following activity diagram describes the process of synchronizing updates made to customers in the Core Banking System to downstream systems:

![](https://anypoint.mulesoft.com/exchange/org.mule.examples/mulesoft-accelerator-for-financial-services/1.12.0/external-resources/69d3837ece00061753654d4cec22f63934e8faf8/68747470733a2f2f7777772e6d756c65736f66742e636f6d2f6578742f736f6c7574696f6e732f696d616765732f66696e732d61637469766974792d666f756e646174696f6e2d637573746f6d65722d73796e632d636f72652e706e67)