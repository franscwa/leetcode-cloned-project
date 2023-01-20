
import { CompanyProblemDurations } from "./Objects"
import {AcceptanceSorter, DifficultySorter, NameSorter, IDSorter, FrequencySorter} from "./ProblemSorter"
import { TableElementGenerator, styleHeader } from "./ElementGenerator"

class TableContentBuilder{ 
    constructor() {
        this.tableId = "table-content"
        this.shownData = []
        this.currentlySortedBy = ""
        this.isReverseSorted = false

        this.parentDiv = document.createElement('div')
        this.durationData = {}
    } 

    setShownData(data) { 
        this.shownData = data

        return this
}

    addDurationData(duration, data) { 
        this.durationData[duration] = data
    }

    buildDurationsRow() { 
        let row =  TableElementGenerator.generateRowElement()
        for(let duration in this.durationData) { 
            let element = TableElementGenerator.generateDurationElement(duration)
            styleHeader(element)
            element.addEventListener('click', this.onDurationButtonClicked)
            row.appendChild(element)
        }    
        this.parentDiv.appendChild(row)
        return this
    }

    buildHeaderRow() { 
        let row = TableElementGenerator.generateRowElement()
        let idHeaderCell = TableElementGenerator.generateProblemIdElement("#")
        let titleHeaderCell = TableElementGenerator.generateProblemNameElement("Title", "javascript:void(0)")
        let acceptanceHeaderCell= TableElementGenerator.generateProblemAcceptanceElement("Acceptance")
        let difficultyHeaderCell= TableElementGenerator.generateProblemDifficultyElement("Difficulty")
        let frequencyHeaderCell= TableElementGenerator.generateProblemAcceptanceElement("Frequency")

        styleHeader(idHeaderCell.firstChild)
        styleHeader(titleHeaderCell.firstChild)
        styleHeader(acceptanceHeaderCell.firstChild)
        styleHeader(difficultyHeaderCell.firstChild)
        styleHeader(frequencyHeaderCell.firstChild)

        idHeaderCell.addEventListener('click', this.getOnHeaderClickedFunction(IDSorter).bind(this))
        titleHeaderCell.addEventListener('click', this.getOnHeaderClickedFunction(NameSorter).bind(this))
        acceptanceHeaderCell.addEventListener('click', this.getOnHeaderClickedFunction(AcceptanceSorter).bind(this))
        difficultyHeaderCell.addEventListener('click', this.getOnHeaderClickedFunction(DifficultySorter).bind(this))
        frequencyHeaderCell.addEventListener('click', this.getOnHeaderClickedFunction(FrequencySorter).bind(this))

        row.appendChild(idHeaderCell)
        row.appendChild(titleHeaderCell)
        row.appendChild(acceptanceHeaderCell)
        row.appendChild(difficultyHeaderCell)
        row.appendChild(frequencyHeaderCell)
        this.parentDiv.appendChild(row)
        return this
    }

    buildTable(Sortby = NameSorter) { 
        this.shownData.sort(Sortby)
        this.currentlySortedBy = Sortby.name
        this.isReverseSorted = false
        let table = TableElementGenerator.generateTableContentElement(this.shownData)
        this.parentDiv.appendChild(table)
        return this
    }

    getResult() {
        return this.parentDiv
    }

    
    onDurationButtonClicked = (event) => {
        this.shownData = this.durationData[event.currentTarget.getAttribute("duration")]
        this.swapContentTableElement(this.shownData)
    }

    getOnHeaderClickedFunction(Sorter) { 
        return () => {  
            if(Sorter.name == this.currentlySortedBy) { 
                this.shownData.sort(Sorter, !this.isReverseSorted)    
                this.isReverseSorted = !this.isReverseSorted
            } else { 
                this.shownData.sort(Sorter)
                this.currentlySortedBy = Sorter.name
                this.isReverseSorted = false
            }
            this.swapContentTableElement(this.shownData)
        }
    }

    swapContentTableElement = (swapTo) => {
        if(document.getElementById(this.tableId) != undefined) document.getElementById(this.tableId).remove() 
        let table = TableElementGenerator.generateTableContentElement(swapTo)
        this.parentDiv.appendChild(table)
    }
}

export {TableContentBuilder}