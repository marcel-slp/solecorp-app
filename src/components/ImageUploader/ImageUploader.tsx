import { IconButton, Image, Input } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import * as styles from "./styles.css";
import { getImagemURL } from "../../utils/Utils";

type Props = {
  imagem: string | File | null;
  imagemDefault: string;
  onChange: (file: File | null) => void;
};

export function ImageUploader({ imagem, imagemDefault, onChange }: Props) {  
  const imagemSrc = imagem ? typeof imagem === "string" ? getImagemURL(String(imagem)) : URL.createObjectURL(imagem) : imagemDefault;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    
    if (file) {
      onChange(file);
    }
  };

  const handleReset = () => {
    onChange(null);
  };
  
  return (
    <div className={styles.uploaderWrapper}>
      <label className={styles.uploaderContainer}>
        <Image
          src={imagemSrc}
          alt="Imagem"
          className={styles.uploaderImage}
        />
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.uploaderInput}
        />
      </label>

      {imagemSrc !== imagemDefault && (
        <IconButton
          aria-label="Remover imagem"
          icon={<CloseIcon />}
          size="sm"
          className={styles.uploaderResetButton}
          onClick={handleReset}
        />
      )}
    </div>
  );
}
