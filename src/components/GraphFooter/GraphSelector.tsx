import { ButtonGroup, Dropdown } from 'react-bootstrap';
import styles from './GraphSelector.module.css';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
const GraphSelecter = ({ graph, selected, setSelected }: GraphFooterProps) => {
  return (
    <div>
      <Dropdown as={ButtonGroup} drop="down-centered">
        <Dropdown.Toggle className={styles.title}>
          {graph[selected]}
        </Dropdown.Toggle>
        <DropdownMenu className={styles.footer}>
          {[...graph].map((g, i) => {
            return (
              <Dropdown.Item
                key={g}
                value={i}
                className={styles.button}
                onClick={() => {
                  setSelected(i);
                }}
              >
                {g}
              </Dropdown.Item>
            );
          })}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
export default GraphSelecter;
